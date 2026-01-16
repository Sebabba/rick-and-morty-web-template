import { render, screen } from '@testing-library/react';
import LocationDetails from '../locationDetails';
import { LocationType } from '~/utils/types';

let item: LocationType = {
    id: 3,
    name: "Citadel of Ricks",
    type: "Space station",
    dimension: "unknown",
    residents: [],
    url: "",
    created: "2017-11-10T13:08:13.191Z"
}

describe('Location Details', () => {
    test('renders the Location Details component element with fetched data', () => {
        render(<LocationDetails item={item} />)
        expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();
        expect(screen.getByText(/Space station/i)).toBeInTheDocument();
        expect(screen.getByText(/unknow/i)).toBeInTheDocument();
    })
})