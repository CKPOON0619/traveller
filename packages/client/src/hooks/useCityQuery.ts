import type { ApolloError } from '@apollo/client'
import { gql, useQuery } from '@apollo/client'
import type { CityData } from './type'

interface UseCityQueryReturnType {
  loading: boolean
  error?: ApolloError
  city?: CityData
}

export const useCityQuery = (id: number): UseCityQueryReturnType => {
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
    fetchPolicy: 'network-only',
  })

  return { loading, error, city: data && data.city }
}
