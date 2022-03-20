import React from 'react'
import { City } from './City'
import { useWishListCitiesQuery } from '../../hooks/useWishListCitiesQuery'
import { CitiesDisplay } from '../../components/CitiesDisplay/CitiesDisplay'

export const WishListCities: React.VoidFunctionComponent = () => {
  const { loading, cities, error } = useWishListCitiesQuery()
  return (
    <CitiesDisplay loading={loading} error={error}>
      {cities && cities.map(({ id }) => <City key={id} id={id} />)}
    </CitiesDisplay>
  )
}
