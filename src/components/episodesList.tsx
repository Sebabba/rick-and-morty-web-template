import type { JSX } from 'react';
import { EpisodeType } from '~/utils/types';
import { Search } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import EpisodeCard from './episodeCard';
import loadingComponent from '../images/loading-component.png';

export default function EpisodesList(): JSX.Element {
	const [items, setItems] = useState<EpisodeType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [name, setName] = useState<string>('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`https://rickandmortyapi.com/api/episode/?page=${page}&name=${name}`,
				);

				if (!response.ok) throw new Error('No Episode Found');

				const data = await response.json();

				setItems((prev) =>
					page === 1 ? data.results : [...prev, ...data.results],
				);
				setHasMore(data.info.next !== null);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		};

		if (hasMore) fetchData();
	}, [page, name]);

	const observer = useRef<IntersectionObserver | null>(null);

	const lastElementRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (loading) return;

			// remove the past observer
			if (observer.current) observer.current.disconnect();

			// set the new observer
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPage((prev) => prev + 1);
				}
			});

			if (node) observer.current.observe(node);
		},
		[loading, hasMore],
	);

	return (
		<>
			<div className="search-container">
				<div className="search-icon">
					<Search size={23} />
				</div>
				<input
					id="filter-input"
					className="search-input"
					type="text"
					placeholder="Filter by name..."
					value={name}
					onChange={(e) => {
						setItems([]);
						setPage(1);
						setHasMore(true);
						setError(null);
						setName(e.target.value);
					}}
				/>
			</div>
			<div className="grid-container">
				{items.map((item, index) => {
					if (index === items.length - 1) {
						return (
							<div ref={lastElementRef} key={item.id}>
								<EpisodeCard item={item} />
							</div>
						);
					}

					return (
						<div key={item.id}>
							<EpisodeCard item={item} />
						</div>
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
}
