import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './styles/index.scss';
import { App } from './App';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

type IFlat = {
	id: number;
	Тип: string;
}

interface IFlats {
	flats: IFlat[];
}

const vladTestAPI = (url: string): Promise<IFlats> => {
	return fetch(`${url}/flats`, {
			method: 'GET',
	})
	.then(response => {
			if (!response.ok) throw new Error('Ошиб-ОЧКА');
			return response.json();
	})
	.then(data => {
			return { flats: data };
	});
}

vladTestAPI('http://localhost:8000')
	.then((res) => {
		console.log(res);
	})

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
