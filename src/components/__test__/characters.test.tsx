import { render, screen } from '@testing-library/react';
import Characters from '../characters';
import { CharacterType } from '~/utils/types';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        info: { next: null },
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'Earth (C-137)', url: '' },
            location: { name: 'Citadel of Ricks', url: '' },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [],
            url: '',
            created: '',
          } as CharacterType,
        ],
      }),
  }),
) as jest.Mock;

describe('Characters component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search input and filter button', () => {
    render(<Characters />);
    expect(screen.getByPlaceholderText(/Filter by name/i)).toBeInTheDocument();
    expect(screen.getByText(/ADVANCED FILTERS/i)).toBeInTheDocument();
  });

});
