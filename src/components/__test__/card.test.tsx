import { render, screen } from '@testing-library/react';
import Card from '../card';
import { Character } from '~/utils/types';

let item: Character = {
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
});
