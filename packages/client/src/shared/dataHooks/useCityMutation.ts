import { gql, useMutation } from '@apollo/client'
import * as React from 'react'
import type { CityMutation } from './type'

export const useCityMutation = () => {
  const CITY_MUTATE = gql`
    mutation CITY_MUTATE($input: CitiesMutationInput) {
      updateCity(input: $input) {
        id
        visited
        wishlist
      }
    }
  `

  const [mutateCity, { error }] = useMutation(CITY_MUTATE)

  const handleCityChange = React.useCallback(
    (changes: CityMutation) => {
      mutateCity({ variables: { input: changes } })
    },
    [mutateCity]
  )

  return { handleCityChange, error }
}
