import { render, screen } from '@testing-library/react';
import CharacterDetails from '../characterDetails';
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

describe('CharacterDetails component', () => {
    test('renders character details', () => {
        render(<CharacterDetails item={item} />)
        expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
        expect(screen.getByText(/Human/i)).toBeInTheDocument();
        expect(screen.getByText(/Earth \(C-137\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();
    })
})