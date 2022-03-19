import React from 'react'
import { City } from './City'
import { useWishListCitiesQuery } from '../../shared/dataHooks/useWishListCitiesQuery'
import { CitiesDisplay } from '../../shared/CitiesDisplay/CitiesDisplay'

export const WishListCities: React.VoidFunctionComponent = () => {
  const { loading, cities, error } = useWishListCitiesQuery()
  return (
    <CitiesDisplay loading={loading} error={error}>
      {cities && cities.map(({ id }) => <City key={id} id={id} />)}
    </CitiesDisplay>
  )
}
