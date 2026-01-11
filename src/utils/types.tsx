export type RickAndMortyResponse = {
    info: {
        count: number,
        pages: number,
        next: string | null,
        prev: string | null
    },
    results: Character[]
    
}

export type Character = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: string,
    location: string,
    image: string,
    episode: [],
    url: string,
    created: string
}