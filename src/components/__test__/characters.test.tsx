import { render, screen } from '@testing-library/react';
import Characters from '../characters';
import { Character } from '~/utils/types';

describe('Characters component', () => {
	test('renders the component title', () => {
		render(<Characters />);

		const titleElement = screen.getByText(/characters/i);
		expect(titleElement).toBeInTheDocument();
	});
});
