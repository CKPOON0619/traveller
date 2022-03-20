import { useQuery, gql } from '@apollo/client'
import type { CityData } from './type'

export const useCitiesSearchQuery = (search: string) => {
  const CITIES_SEARCH_QUERY = gql`
    query CITIES_SEARCH_QUERY($filter: CitiesFilters) {
      cities(filter: $filter) {
        cities {
          id
        }
      }
    }
  `

  const { loading, error, data } = useQuery<{
    cities: {
      cities: CityData[]
    }
  }>(CITIES_SEARCH_QUERY, {
    variables: {
      filter: {
        name: search,
      },
    },
    fetchPolicy: 'network-only',
    skip: !search,
  })
  return { loading, error, cities: data?.cities.cities }
}
