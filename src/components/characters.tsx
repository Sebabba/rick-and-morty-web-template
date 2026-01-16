import type { JSX } from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { CharacterType } from '~/utils/types';
import Card from './card';
import { Search } from 'lucide-react';
import Image from 'next/image';
import loadingComponent from '../images/loading-component.png';

export default function Characters(): JSX.Element {
	// setup the states
	const [items, setItems] = useState<CharacterType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [name, setName] = useState<string>('');

	const [filterOpen, setFilterOpen] = useState(false);
	const [species, setSpecies] = useState('');
	const [gender, setGender] = useState('');
	const [status, setStatus] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}&species=${species}&gender=${gender}&status=${status}`,
				);

				if (!response.ok) throw new Error('No Character Found');

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

		// fetch data only if we have more data to fetch
		if (hasMore) fetchData();
	}, [page, name, filterOpen]);

	// infinite scroller implementation
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
			<div className="search-container">
				<button
					onClick={() => setFilterOpen(!filterOpen)}
					className="filter-button"
				>
					ADVANCED FILTERS
				</button>
			</div>

			{filterOpen && (
				<div className="modal-overlay" onClick={() => setFilterOpen(false)}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<h3 style={{ marginBottom: '10px' }}>Filters</h3>

						<div className="modal-field">
							<select
								value={species}
								onChange={(e) => setSpecies(e.target.value)}
							>
								<option value="" disabled selected hidden>
									Species
								</option>
								<option value="">Any</option>
								<option value="Human">Human</option>
								<option value="Alien">Alien</option>
								<option value="Robot">Robot</option>
							</select>
						</div>

						<div className="modal-field">
							<select
								value={gender}
								onChange={(e) => setGender(e.target.value)}
							>
								<option value="" disabled selected hidden>
									Gender
								</option>
								<option value="">Any</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Genderless">Genderless</option>
								<option value="unknown">Unknown</option>
							</select>
						</div>

						<div className="modal-field">
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value)}
							>
								<option value="" disabled selected hidden>
									Status
								</option>
								<option value="">Any</option>
								<option value="Alive">Alive</option>
								<option value="Dead">Dead</option>
								<option value="unknown">Unknown</option>
							</select>
						</div>

						<button
							className="filter-button"
							onClick={() => {
								setItems([]);
								setPage(1);
								setHasMore(true);
								setError(null);
								setFilterOpen(false);
							}}
						>
							Apply
						</button>
					</div>
				</div>
			)}

			<div className="grid-container">
				{items.map((item, index) => {
					// if it is the last element, we attach the observer
					if (index === items.length - 1) {
						return (
							<div ref={lastElementRef} key={item.id}>
								<Card item={item} />
							</div>
						);
					}

					return (
						<div key={item.id}>
							<Card item={item} />
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
