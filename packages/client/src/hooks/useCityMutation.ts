import type { ApolloError } from '@apollo/client'
import { gql, useMutation } from '@apollo/client'
import * as React from 'react'
import type { CityID, CityMutation, CityUserConfig } from './type'

interface useCityMuReturnType {
  handleCityChange: (changes: CityMutation) => void
  updatedCityUserConfig?: CityID & CityUserConfig
  error?: ApolloError
}

export const useCityMutation = (): useCityMuReturnType => {
  const CITY_MUTATE = gql`
    mutation CITY_MUTATE($input: CitiesMutationInput) {
      updateCity(input: $input) {
        id
        visited
        wishlist
      }
    }
  `

  const [mutateCity, { error, data, loading }] = useMutation(CITY_MUTATE)
  // console.log({ data })
  const handleCityChange = React.useCallback(
    (changes: CityMutation) => {
      mutateCity({ variables: { input: changes } })
    },
    [mutateCity]
  )
  console.log('mutation', { loading, data })

  return { handleCityChange, error, updatedCityUserConfig: data && data.updateCity }
}
