import type { JSX } from 'react';
import { LocationType } from '~/utils/types';
import Link from 'next/link';

type CardProps = {
	item: LocationType;
};

export default function LocationCard({ item }: CardProps): JSX.Element {
	return (
		<Link href={{ pathname: `/location`, query: { id: item.id } }}>
			<article className="locationCard">
				<h3>{item.name}</h3>
				<p>{item.type}</p>
			</article>
		</Link>
	);
}
