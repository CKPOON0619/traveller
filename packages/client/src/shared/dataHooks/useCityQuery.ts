import { gql, useQuery } from '@apollo/client'
import type { CityData } from './type'

export const useCityQuery = (id: number) => {
  const CITY_QUERY = gql`
    query CITY_QUERY($cityId: Int!) {
      city(id: $cityId) {
        id
        name
        country
        visited
        wishlist
      }
    }
  `
  const { loading, error, data } = useQuery<{ city: CityData }>(CITY_QUERY, {
    variables: {
      cityId: id,
    },
  })

  return { loading, error, data }
}
