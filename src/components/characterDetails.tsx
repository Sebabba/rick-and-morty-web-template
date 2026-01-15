import { useEffect, useState, type JSX } from 'react';
import { Character } from '~/utils/types';
import Link from 'next/link';
import { Episode } from '~/utils/types';

type CardProps = {
	item: Character | undefined;
};

export default function characterDetails({ item }: CardProps): JSX.Element {

    const [episodes, setEpisodes] = useState<Episode[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log(item)
        if(!item) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                for(let i=0; i<item.episode.length; i++){
                    const response = await fetch(item.episode[i])
                    const data = await response.json()
                    setEpisodes((prev) => [...prev, data])
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [item]);

    if(item){
        return(
            <article className='characterDetails'>
                <div className='detailsHeader'>
                    {item.image && (
                        <img
                            src={item.image}
                            alt={item.name}
                        />
				    )}
                    <h2>{item.name}</h2>
                </div>
                <h3>Informations</h3>
                <div className='detailsInformation'>
                    <p className='detailsName'>Gender</p>
                    <p className='detailsValue'>{item.gender}</p>
                    <hr />
                    <p className='detailsName'>Status</p>
                    <p className='detailsValue'>{item.status}</p>
                    <hr />
                    <p className='detailsName'>Specie</p>
                    <p className='detailsValue'>{item.species}</p>
                    <hr />
                    <p className='detailsName'>Origin</p>
                    <p className='detailsValue'>{item.origin.name}</p>
                    <hr />
                    {item.type && <>
                        <p className='detailsName'>Type</p>
                        <p className='detailsValue'>{item.type}</p>
                        <hr />
                    </>}
                    <p className='detailsName'>Location</p>
                    <p className='detailsValue'>{item.location.name}</p>
                    <hr />
                </div>
                <h3>Episodes</h3>
                <div className='detailsEpisodes'>
                    {episodes.map((episode:Episode) => {
                        return(
                            <>
                                <p className='detailsEpisodeEpisode'>{episode.episode}</p>
                                <p className='detailsEpisodeName'>{episode.name}</p>
                                <p className='detailsEpisodeAirDate'>{episode.air_date}</p>
                                <hr />
                            </>
                        )
                    })}
                </div>
            </article>
        )
    } else {
        return(
            <div className='characterDetails'>
                <p>Non Existing Character</p>
            </div>
        )
    }
}