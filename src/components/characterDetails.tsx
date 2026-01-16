import { useEffect, useState, type JSX } from 'react';
import { CharacterType } from '~/utils/types';
import { EpisodeType } from '~/utils/types';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import loadingComponent from '../images/loading-component.png'

type CardProps = {
	item: CharacterType | undefined;
};

export default function CharacterDetails({ item }: CardProps): JSX.Element {
	const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [location, setLocation] = useState<string | null>(null);

	useEffect(() => {
		if (!item) return;

		const fetchData = async () => {
			try {
				setLoading(true);
				for (let i = 0; i < item.episode.length; i++) {
					const response = await fetch(item.episode[i]);
					const data = await response.json();
					setEpisodes((prev) => [...prev, data]);
				}
				const response = await fetch(item.location.url);
				const data = await response.json();
				setLocation(data.id);
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
				<article className="characterDetails">
					<div className="detailsHeader">
						{item.image && <img src={item.image} alt={item.name} />}
						<h2>{item.name}</h2>
					</div>
					<h3 className='detailsSectionTitle'>Informations</h3>
					<div className="detailsInformation">
						<p className="detailsName">Gender</p>
						<p className="detailsValue">{item.gender}</p>
						<hr />
						<p className="detailsName">Status</p>
						<p className="detailsValue">{item.status}</p>
						<hr />
						<p className="detailsName">Specie</p>
						<p className="detailsValue">{item.species}</p>
						<hr />
						<p className="detailsName">Origin</p>
						<p className="detailsValue">{item.origin.name}</p>
						<hr />
						{item.type && (
							<>
								<p className="detailsName">Type</p>
								<p className="detailsValue">{item.type}</p>
								<hr />
							</>
						)}
						<Link href={{pathname: `/location`, query:{id: location}}}>
							<div className='detailsLink'>
								<div>
									<p className="detailsName">Location</p>
									<p className="detailsValue">{item.location.name}</p>
								</div>
								<ChevronRight style={{marginRight: "10px"}}/>
							</div>
						</Link>
						<hr />
					</div>
					<h3 className='detailsSectionTitle'>Episodes</h3>
					<div className="detailsEpisodes">
						{episodes.map((episode: EpisodeType) => {
							return (
								<>
									<Link href={{pathname: `/episode`, query:{id: episode.id}}}>
										<div className='detailsLink'>
											<div>
												<p className="detailsEpisodeEpisode">{episode.episode}</p>
												<p className="detailsEpisodeName">{episode.name}</p>
												<p className="detailsEpisodeAirDate">{episode.air_date}</p>
											</div>
											<ChevronRight style={{marginRight: "10px"}}/>
										</div>
									</Link>
									<hr />
								</>
							);
						})}
					</div>
				</article>

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
		return (
			<div className="characterDetails">
				<p>Non Existing Character</p>
			</div>
		);
	}
}
