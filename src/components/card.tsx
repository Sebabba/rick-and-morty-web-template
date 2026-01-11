import type {JSX} from 'react'
import { Character } from '~/utils/types'

type CardProps = {
    item: Character
}

export default function Card({item}:CardProps):JSX.Element {
    return(
        <article key={item.id} className='card'>
            <h3>{item.name}</h3>
            <p>{item.species}</p>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
              />
            )}
        </article>
    )
}