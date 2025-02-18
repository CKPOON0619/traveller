import React from 'react'
import { City } from './City'
import { useCitiesSearchQuery } from '../../hooks/useCitiesSearchQuery'
import { CitiesDisplay } from '../../components/CitiesDisplay/CitiesDisplay'

export const SearchResult: React.VoidFunctionComponent<{ searchName: string }> = ({ searchName }) => {
  const { loading, cities, error } = useCitiesSearchQuery(searchName)

  return (
    <CitiesDisplay loading={loading} error={error}>
      {cities && cities.map(({ id }) => <City key={id} id={id} />)}
    </CitiesDisplay>
  )
}
