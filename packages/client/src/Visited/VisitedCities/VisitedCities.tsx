import React from 'react'
import { City } from './City'
import { useVisitedCitiesQuery } from '../../hooks/useVisitedCitiesQuery'
import { CitiesDisplay } from '../../components/CitiesDisplay/CitiesDisplay'

export const VisitedCities: React.VoidFunctionComponent = () => {
  const { loading, cities, error } = useVisitedCitiesQuery()
  return (
    <CitiesDisplay loading={loading} error={error}>
      {cities && cities.map(({ id }) => <City key={id} id={id} />)}
    </CitiesDisplay>
  )
}
