import type { JSX } from 'react';
import { Character } from '~/utils/types';
import Link from 'next/link';

type CardProps = {
	item: Character;
};

export default function Card({ item }: CardProps): JSX.Element {
	return (
		<Link href={{
			pathname: `/characterDetail`,
			query: { id: item.id }
		}}>
			<article key={item.id} className="card">
				{item.image && (
					<img
						src={item.image}
						alt={item.name}
						style={{
							width: '100%',
							borderRadius: '8px',
							marginTop: '10px',
							marginBottom: '10px',
						}}
					/>
				)}
				<h3>{item.name}</h3>
				<p>{item.species}</p>
			</article>
		</Link>
	);
}
