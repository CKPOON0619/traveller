import { useQuery, gql } from '@apollo/client'
interface CityData {
  id: number
  country: string
  name: string
  visited: boolean
  wishlist: boolean
}

interface CityQueryData {
  cities: {
    cities: CityData[]
  }
}

export const useVisitedCitiesQuery = () => {
  const VISITED_CITIES_QUERY = gql`
    query VISITED_CITIES_QUERY($filter: CitiesFilters) {
      cities(filter: $filter) {
        cities {
          id
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
