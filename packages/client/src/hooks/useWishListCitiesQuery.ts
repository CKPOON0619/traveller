import type { ApolloError } from '@apollo/client'
import { useQuery, gql } from '@apollo/client'
import type { CityData } from './type'

interface CityQueryData {
  cities: {
    cities: CityData[]
  }
}

interface UseWishListCitiesQueryReturnType {
  loading: boolean
  error?: ApolloError
  cities?: CityData[]
}

export const useWishListCitiesQuery = (): UseWishListCitiesQueryReturnType => {
  const WISHLIST_CITIES_QUERY = gql`
    query WISHLIST_CITIES_QUERY($filter: CitiesFilters) {
      cities(filter: $filter) {
        cities {
          id
          name
          country
          visited
        }
      }
    }
  `

  const { loading, error, data } = useQuery<CityQueryData>(WISHLIST_CITIES_QUERY, {
    variables: {
      filter: {
        wishlist: true,
      },
    },
    fetchPolicy: 'network-only',
  })
  return { loading, error, cities: data?.cities.cities }
}
