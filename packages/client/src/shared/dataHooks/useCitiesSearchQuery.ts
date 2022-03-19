import { useQuery, gql } from '@apollo/client'
import type { CityData } from './type'

export const useCitiesSearchQuery = (search: string) => {
  const CITIES_QUERY = gql`
    query CITIES_QUERY($filter: CitiesFilters) {
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
  }>(CITIES_QUERY, {
    variables: {
      filter: {
        name: search,
      },
    },
    skip: !search,
  })
  return { loading, error, cities: data?.cities.cities }
}
