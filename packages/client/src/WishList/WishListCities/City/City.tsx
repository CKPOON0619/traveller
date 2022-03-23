import * as React from 'react'
import { useCityMutation } from '../../../hooks/useCityMutation'
import { MemoizedCityCard } from '../../../components/CityCard/CityCard'

export interface CityProps {
  id: number
  name: string
  country: string
  visited: boolean
}

export const City: React.VoidFunctionComponent<CityProps> = ({ id, name, country, visited }) => {
  const { handleCityChange, error: mutateError, updatedCityUserConfig } = useCityMutation()

  return (
    <MemoizedCityCard
      onCityChange={handleCityChange}
      cityInfo={{
        id,
        name,
        country,
        visited: (updatedCityUserConfig && updatedCityUserConfig.visited) || visited,
      }}
      error={mutateError}
    />
  )
}
