import { render, screen } from '@testing-library/react';
import Card from '../card';
import { CharacterType } from '~/utils/types';

let item: CharacterType = {
	id: 1,
	name: 'Rick Sanchez',
	status: 'Alive',
	species: 'Human',
	type: '',
	gender: 'Male',
	origin: {
		name: 'Earth (C-137)',
		url: 'https://rickandmortyapi.com/api/location/1',
	},
	location: {
		name: 'Citadel of Ricks',
		url: 'https://rickandmortyapi.com/api/location/3',
	},
	image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
	episode: [],
	url: 'https://rickandmortyapi.com/api/character/1',
	created: '2017-11-04T18:48:46.250Z',
};

describe('Card component', () => {
	test('renders the Card element with fetched data', () => {
		render(<Card item={item} />);

		const nameElement = screen.getByText(item.name);
		expect(nameElement).toBeInTheDocument();

		const speciesElement = screen.getByText(item.species);
		expect(speciesElement).toBeInTheDocument();

		const imageElement = screen.getByAltText(item.name);
		expect(imageElement).toBeInTheDocument();
		expect(imageElement).toHaveAttribute('src', item.image);
	});

	test('Link has correct href', () => {
		render(<Card item={item} />);

		const linkElement = screen.getByRole('link');
		expect(linkElement).toHaveAttribute('href', `/character?id=${item.id}`);
	});

	test('article has correct class', () => {
		render(<Card item={item} />);

		const article = screen.getByRole('link').querySelector('article');
		expect(article).toHaveClass('card');
	});

	test('image has inline styles', () => {
		render(<Card item={item} />);

		const image = screen.getByAltText(item.name);
		expect(image).toHaveStyle({
			width: '100%',
			borderRadius: '8px',
			marginTop: '10px',
			marginBottom: '10px',
		});
	});

	test('renders title and species inside article', () => {
		render(<Card item={item} />);

		const article = screen.getByRole('link').querySelector('article');

		expect(article).toContainElement(screen.getByText(item.name));
		expect(article).toContainElement(screen.getByText(item.species));
	});

	test('renders correctly when image is missing', () => {
		const itemWithoutImage = { ...item, image: '' };
		render(<Card item={itemWithoutImage} />);

		const image = screen.queryByAltText(item.name);
		expect(image).not.toBeInTheDocument();
	});
});
