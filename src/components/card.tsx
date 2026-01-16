import type { JSX } from 'react';
import { CharacterType } from '~/utils/types';
import Link from 'next/link';

type CardProps = {
	item: CharacterType;
};

export default function Card({ item }: CardProps): JSX.Element {
	return (
		<Link
			href={{
				pathname: `/character`,
				query: { id: item.id },
			}}
		>
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
				<h3 className="cardTitle">{item.name}</h3>
				<p className="cardSpecie">{item.species}</p>
			</article>
		</Link>
	);
}
