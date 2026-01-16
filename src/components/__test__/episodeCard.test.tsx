import { render, screen } from '@testing-library/react';
import EpisodeCard from '../episodeCard';
import { EpisodeType } from '~/utils/types';

let item: EpisodeType = {
    id: 1,
    name: "The Ricklantis Mixup",
    air_date: "Septemer 10, 2017",
    episode: "S03E07",
    characters: [
        "https://rickandmortyapi.com/api/character/1",
        "https://rickandmortyapi.com/api/character/2"
    ],
    url: "https://rickandmortyapi.com/api/episode/28",
    created: "2017-11-10T12:56:36.618Z"
}

describe('Episode Card', () => {
    test('renders the Episode Card element with fetched data', () => {
        render(<EpisodeCard item={item} />)

        expect(screen.getByText(/The Ricklantis Mixup/i)).toBeInTheDocument();
        expect(screen.getByText(/Septemer 10, 2017/i)).toBeInTheDocument();
        expect(screen.getByText(/S03E07/i)).toBeInTheDocument();
    })
})