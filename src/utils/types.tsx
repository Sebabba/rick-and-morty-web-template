export type RickAndMortyResponse = {
	info: {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
	};
	results: CharacterType[];
};

export type CharacterType = {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: [];
	url: string;
	created: string;
};

export type EpisodeType = {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
	url: string;
	created: string;
};

export type LocationType = {
	id: number;
	name: string;
	type: string;
	dimension: string;
	residents: string[];
	url: string;
	created: string;
};
