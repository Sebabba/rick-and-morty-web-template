export type RickAndMortyResponse = {
	info: {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
	};
	results: Character[];
};

export type Character = {
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

export type Episode = {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: Character[];
	url: string;
	created: string;
}