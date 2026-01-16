import type { JSX } from 'react';
import { LocationType } from '~/utils/types';
import { Search } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import LocationCard from './locationCard';
import loadingComponent from '../images/loading-component.png';

export default function LocationsList(): JSX.Element {
	const [items, setItems] = useState<LocationType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [name, setName] = useState<string>('');

	const [filterOpen, setFilterOpen] = useState(false);
	const [type, setType] = useState('');
	const [dimension, setDimension] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`https://rickandmortyapi.com/api/location/?page=${page}&name=${name}&type=${type}&dimension=${dimension}`,
				);

				if (!response.ok) throw new Error('No Location Found');

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
	}, [page, name, filterOpen]);

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
							<select value={type} onChange={(e) => setType(e.target.value)}>
								<option value="" disabled selected hidden>
									Type
								</option>
								<option value="">Any</option>
								<option value="Planet">Planet</option>
								<option value="Cluster">Cluster</option>
								<option value="Space station">Space station</option>
								<option value="Microverse">Microverse</option>
								<option value="TV">TV</option>
								<option value="Resort">Resort</option>
								<option value="Fantasy town">Fantasy town</option>
								<option value="Dream">Dream</option>
								<option value="Dimension">Dimension</option>
								<option value="Menagerie">Menagerie</option>
								<option value="Game">Game</option>
								<option value="Customs">Customs</option>
								<option value="Dwarf planet (Celestial Dwarf)">
									Dwarf planet (Celestial Dwarf)
								</option>
								<option value="Teenyverse">Teenyverse</option>
								<option value="Box">Box</option>
								<option value="Spacecraft">Spacecraft</option>
								<option value="Artificially generated world">
									Artificially generated world
								</option>
								<option value="Machine">Machine</option>
								<option value="Arcade">Arcade</option>
								<option value="Spa">Spa</option>
								<option value="Quadrant">Quadrant</option>
								<option value="Quasar">Quasar</option>
								<option value="Mount">Mount</option>
								<option value="Liquid">Liquid</option>
								<option value="Convention">Convention</option>
								<option value="Woods">Woods</option>
								<option value="Diegesis">Diegesis</option>
								<option value="Non-Diegetic Alternative Reality">
									Non-Diegetic Alternative Reality
								</option>
								<option value="Nightmare">Nightmare</option>
								<option value="Asteroid">Asteroid</option>
								<option value="Acid Plant">Acid Plant</option>
								<option value="Reality">Reality</option>
								<option value="Death Star">Death Star</option>
								<option value="Base">Base</option>
								<option value="Elemental Rings">Elemental Rings</option>
								<option value="Human">Human</option>
								<option value="Space">Space</option>
								<option value="Hell">Hell</option>
								<option value="Police Department">Police Department</option>
								<option value="Country">Country</option>
								<option value="Consciousness">Consciousness</option>
								<option value="Memory">Memory</option>
								<option value="unknown">Unknown</option>
							</select>
						</div>

						<div className="modal-field">
							<select
								value={dimension}
								onChange={(e) => setDimension(e.target.value)}
							>
								<option value="" disabled selected hidden>
									Dimension
								</option>
								<option value="">Any</option>
								<option value="Dimension C-137">Dimension C-137</option>
								<option value="Post-Apocalyptic Dimension">
									Post-Apocalyptic Dimension
								</option>
								<option value="Replacement Dimension">
									Replacement Dimension
								</option>
								<option value="Cronenberg Dimension">
									Cronenberg Dimension
								</option>
								<option value="Fantasy Dimension">Fantasy Dimension</option>
								<option value="Testicle Monster Dimension">
									Testicle Monster Dimension
								</option>
								<option value="Cromulon Dimension">Cromulon Dimension</option>
								<option value="Dimension K-83">Dimension K-83</option>
								<option value="Eric Stoltz Mask Dimension">
									Eric Stoltz Mask Dimension
								</option>
								<option value="Dimension J19ζ7">Dimension J19ζ7</option>
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
					if (index === items.length - 1) {
						return (
							<div ref={lastElementRef} key={item.id}>
								<LocationCard item={item} />
							</div>
						);
					}

					return (
						<div key={item.id}>
							<LocationCard item={item} />
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
