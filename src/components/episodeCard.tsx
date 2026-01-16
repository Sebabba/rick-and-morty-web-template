import type { JSX } from 'react';
import { EpisodeType } from '~/utils/types';
import Link from 'next/link';

type CardProps = {
	item: EpisodeType;
};

export default function EpisodeCard({ item }: CardProps): JSX.Element {
	return (
		<Link href={{ pathname: `/episode`, query: { id: item.id } }}>
			<article className="episodeCard">
				<h3>{item.name}</h3>
				<p>{item.air_date}</p>
				<p className="episodeEpisode">{item.episode}</p>
			</article>
		</Link>
	);
}
