
import { useContext } from 'react'
import { SearchContext } from '../context/searchContext'

const useSearchContext = () => {
  return ( useContext(SearchContext))
}

export default useSearchContext
