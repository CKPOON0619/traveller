import React from 'react'
import { City } from './City'
import { useVisitedCitiesQuery } from '../../shared/dataHooks/useVisitedCitiesQuery'
import { CitiesDisplay } from '../../shared/CitiesDisplay/CitiesDisplay'

export const VisitedCities: React.VoidFunctionComponent = () => {
  const { loading, cities, error } = useVisitedCitiesQuery()
  return (
    <CitiesDisplay loading={loading} error={error}>
      {cities && cities.map(({ id }) => <City key={id} id={id} />)}
    </CitiesDisplay>
  )
}
