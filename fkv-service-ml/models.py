import re
import torch
import joblib
import numpy as np
import torch.nn as nn
import nltk
from nltk.corpus import stopwords

nltk.download("stopwords")
stop_words = set(stopwords.words("russian"))

def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^а-яa-z\s]", "", text)
    tokens = text.split()
    tokens = [w for w in tokens if w not in stop_words and len(w) > 2]
    return " ".join(tokens)

class Vocab:
    def __init__(self, word2idx):
        self.word2idx = word2idx
        self.idx2word = {idx: word for word, idx in word2idx.items()}

    def encode(self, text, max_len=20):
        tokens = text.split()
        ids = [self.word2idx.get(word, 1) for word in tokens][:max_len]
        return ids + [0] * (max_len - len(ids))

    def vocab_size(self):
        return len(self.word2idx)

class LabelEncoder:
    def __init__(self, classes):
        self.classes_ = np.array(classes)

    def inverse_transform(self, y):
        return self.classes_[y]

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

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

word2idx = joblib.load("vocab_word2idx.pkl")
classes = joblib.load("label_classes.pkl")

vocab = Vocab(word2idx)
le = LabelEncoder(classes)

model = CharLM(
    hidden_dim=128,
    vocab_size=vocab.vocab_size(),
    num_classes=len(le.classes_),
    aggregation_type="max"
).to(device)

model.load_state_dict(torch.load("model.pth", map_location=device))
model.eval()

def predict_cat(text: str):
    cleaned = clean_text(text)
    encoded = vocab.encode(cleaned)
    input_tensor = torch.tensor([encoded], dtype=torch.long).to(device)

    with torch.no_grad():
        output = model(input_tensor)
        predicted_class = torch.argmax(output, dim=1).item()
        return le.inverse_transform([predicted_class])[0]

