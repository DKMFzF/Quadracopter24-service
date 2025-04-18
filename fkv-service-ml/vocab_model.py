from torch import nn
from collections import Counter
import torch
class Vocab:
    def __init__(self, texts, min_freq=3):
        counter = Counter()
        for text in texts:
            counter.update(text.split())
        self.word2idx = {"<PAD>": 0, "<UNK>": 1}
        for word, freq in counter.items():
            if freq >= min_freq:
                self.word2idx[word] = len(self.word2idx)
        self.idx2word = {idx: word for word, idx in self.word2idx.items()}

    def encode(self, text, max_len=20):
        tokens = text.split()
        ids = [self.word2idx.get(word, 1) for word in tokens][:max_len]
        return ids + [0] * (max_len - len(ids))

    def vocab_size(self):
        return len(self.word2idx)

class CharLM(nn.Module):
    def __init__(
            self, hidden_dim: int, vocab_size: int, num_classes: int,
            aggregation_type: str = 'max'
    ):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, hidden_dim)
        self.rnn = nn.RNN(hidden_dim, hidden_dim, batch_first=True)
        self.linear = nn.Linear(hidden_dim, hidden_dim)
        self.projection = nn.Linear(hidden_dim, num_classes)

        self.non_lin = nn.Tanh()
        self.dropout = nn.Dropout(p=0.3)

        self.aggregation_type = aggregation_type

    def forward(self, input_batch) -> torch.Tensor:
        embeddings = self.embedding(input_batch)
        output, _ = self.rnn(embeddings)

        if self.aggregation_type == 'max':
            output = output.max(dim=1)[0]
        elif self.aggregation_type == 'mean':
            output = output.mean(dim=1)
        else:
            raise ValueError("Invalid aggregation_type")

        output = self.dropout(self.linear(self.non_lin(output)))
        prediction = self.projection(self.non_lin(output))

        return prediction