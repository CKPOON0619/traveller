import { useQuery, gql } from '@apollo/client'
import type { CityData } from './type'

export const useCitiesSearchQuery = (searchCityName?: string) => {
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
        name: searchCityName,
      },
    },
    fetchPolicy: 'network-only',
  })
  return { loading, error, cities: data?.cities.cities }
}
