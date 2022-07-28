import React, {useState, useEffect} from 'react'
import { getHeroes } from '../../api/api'

import HeroCard from '../HeroCard/HeroCard'
import Paginator from '../Paginator/Paginator'
import Loader from '../Loader/Loader'

export default function Home() {
  let [heroes, setHeroes] = useState([])
  let [selectedPage, setSelectedPage] = useState(1)
  let [dbPagesCount, setDBPagesCount] = useState(0)
  let maxPagesAmount = 5
  let [isPending, setPending] = useState(true)

  useEffect(() => {
    getHeroes({maxPages: maxPagesAmount, selectedPage}).then(response => {
      setHeroes(response.data.result)
      setDBPagesCount(response.data.count)
      setPending(false)
    })
  }, [selectedPage])

  return (
    <>
      {
        isPending
        ? <Loader />
        :<>
          <div className="list">
            {heroes.slice(0, 5).map(hero => {
              return <HeroCard key={Math.random()} hero={hero} />
            })}
          </div>
          <Paginator 
            maxPages={maxPagesAmount} 
            selected={selectedPage}
            count={dbPagesCount}
            onSelectPage={(page) => setSelectedPage(page)} 
          />
        </>
      }
    </>
  )
}