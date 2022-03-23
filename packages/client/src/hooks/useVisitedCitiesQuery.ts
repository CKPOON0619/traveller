import type { ApolloError } from '@apollo/client'
import { useQuery, gql } from '@apollo/client'
import type { CityData } from './type'

interface CityQueryData {
  cities: {
    cities: CityData[]
  }
}

interface UseVisitedCitiesQueryReturnType {
  loading: boolean
  error?: ApolloError
  cities?: CityData[]
}

export const useVisitedCitiesQuery = (): UseVisitedCitiesQueryReturnType => {
  const VISITED_CITIES_QUERY = gql`
    query VISITED_CITIES_QUERY($filter: CitiesFilters) {
      cities(filter: $filter) {
        cities {
          id
          name
          country
          wishlist
        }
      }
    }
  `

  const { loading, error, data } = useQuery<CityQueryData>(VISITED_CITIES_QUERY, {
    variables: {
      filter: {
        visited: true,
      },
    },
  })
  return { loading, error, cities: data?.cities.cities }
}
