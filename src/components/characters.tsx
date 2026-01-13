import type {JSX} from 'react'
import { useEffect, useState, useRef, useCallback } from 'react'
import { Character } from '~/utils/types'
import Card from './card'

export default function Characters():JSX.Element {
    // setup the states
    const [items, setItems] = useState<Character[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)

                if(!response.ok) throw new Error("Fetch error")

                const data = await response.json()

                setItems(prev => [...prev, ... data.results])
                setHasMore(data.info.next !== null)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error")
            } finally {
                setLoading(false)
            }
        };

        // fetch data only if we have more data to fetch
        if (hasMore)
            fetchData();
    }, [page])

    // infinite scroller implementation
    const observer = useRef<IntersectionObserver | null>(null)

    const lastElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading)
            return

        // remove the past observer
        if (observer.current)
            observer.current.disconnect()

        // set the new observer
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1)
            }
        })

        if (node)
            observer.current.observe(node)
    }, [loading, hasMore])

    return(
        <>
            <h2 id='characters-title'>Characters:</h2>

            <div className='grid-container'>
                {items.map((item, index) => {
                    // if it is the last element, we attach the observer
                    if (index === items.length - 1) {
                        return (
                            <div ref={lastElementRef} key={item.id}>
                                <Card item={item} />
                            </div>
                        )
                    }

                    return <Card key={item.id} item={item} />
                })}
            </div>

            {loading && <div className="status-msg">Caricamento...</div>}
            {error && <div className="status-msg error">{error}</div>}
        </>
    )
}