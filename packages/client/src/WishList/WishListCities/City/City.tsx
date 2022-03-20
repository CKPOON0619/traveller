import * as React from 'react'
import { useCityQuery } from '../../../hooks/useCityQuery'
import { useCityMutation } from '../../../hooks/useCityMutation'
import { MemoizedCityCard } from '../../../components/CityCard/CityCard'

export interface CityProps {
  id: number
}

export const City: React.VoidFunctionComponent<CityProps> = ({ id }) => {
  const { city, error: queryError, loading: queryLoading } = useCityQuery(id)
  const { handleCityChange, error: mutateError } = useCityMutation()
  const displayInfo = city && {
    id: city.id,
    name: city.name,
    country: city.country,
    visited: city.visited,
  }

  return (
    <MemoizedCityCard
      onCityChange={handleCityChange}
      cityInfo={displayInfo}
      error={queryError || mutateError}
      loading={queryLoading}
    />
  )
}
