import type {JSX} from 'react'
import { useEffect, useState } from 'react'
import { Character } from '~/utils/types'
import Card from './card'

export default function Characters():JSX.Element {
    const [items, setItems] = useState<Character[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://rickandmortyapi.com/api/character`);

                if(!response.ok) throw new Error("Fetch error");

                const data = await response.json();
                setItems(data.results)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error")
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    },[])

    if (loading) return <div className="status-msg">Caricamento in corso...</div>;
    if (error) return <div className="status-msg error">{error}</div>;

    return(
        <>
            <h2>Characters</h2>
            <div className='grid-container'>
                {items.map((item) => (
                    <Card item={item} />
                ))}
            </div>
        </>
    )
}