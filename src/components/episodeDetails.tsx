import { useEffect, useState, type JSX } from 'react';
import { EpisodeType } from '~/utils/types';
import { CharacterType } from '~/utils/types';
import Card from './card';
import loadingComponent from '../images/loading-component.png';

type CardProps = {
	item: EpisodeType | undefined;
};

export default function EpisodeDetails({ item }: CardProps): JSX.Element {
	const [characters, setCharacters] = useState<CharacterType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		console.log(item);
		if (!item) return;

		const fetchData = async () => {
			try {
				setLoading(true);
				for (let i = 0; i < item.characters.length; i++) {
					const response = await fetch(item.characters[i]);
					const data = await response.json();
					setCharacters((prev) => [...prev, data]);
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [item]);

	if (item) {
		return (
			<>
				<div className="episodeDetails">
					<h2 style={{ textAlign: 'center' }}>{item.name}</h2>
					<div className="episodeHeader">
						<div className="type">
							<b>
								<p>Episode</p>
							</b>
							<p style={{ color: '#6e798c' }}>{item.episode}</p>
						</div>
						<div className="dimension">
							<b>
								<p>Date</p>
							</b>
							<p style={{ color: '#6e798c' }}>{item.air_date}</p>
						</div>
					</div>
				</div>
				<h3 className="detailsSectionTitle">Residentes</h3>
				<div className="grid-container">
					{characters.map((character: CharacterType) => {
						return (
							<>
								<Card item={character} />
							</>
						);
					})}
				</div>

				{loading && (
					<div className="status-msg">
						<img
							src={loadingComponent.src}
							alt="Caricamento..."
							style={{ width: 100, height: 100 }}
						/>
					</div>
				)}
				{error && <div className="status-msg error">{error}</div>}
			</>
		);
	} else {
		return <p>Non Existing Location</p>;
	}
}
