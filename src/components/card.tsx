import type { JSX } from 'react';
import { Character } from '~/utils/types';

type CardProps = {
	item: Character;
};

export default function Card({ item }: CardProps): JSX.Element {
	return (
		<article key={item.id} className="card">
			<h3>{item.name}</h3>
			<p>{item.species}</p>
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
			<p className="character-information">
				<b>Status: </b>
				{item.status}
			</p>
			<p className="character-information">
				<b>Species: </b>
				{item.species}
			</p>
			{item.type && (
				<p className="character-information">
					<b>Type: </b>
					{item.type}
				</p>
			)}
			{item.gender && (
				<p className="character-information">
					<b>Gender: </b>
					{item.gender}
				</p>
			)}
			{item.origin && (
				<p className="character-information">
					<b>Origin: </b>
					{item.origin.name}
				</p>
			)}
			{item.location && (
				<p className="character-information">
					<b>Location: </b>
					{item.location.name}
				</p>
			)}
			<p className="character-information">
				<b>Number of episodes: </b>
				{item.episode.length}
			</p>
		</article>
	);
}
