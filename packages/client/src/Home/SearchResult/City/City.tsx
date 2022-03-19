import * as React from 'react'
import { useCityQuery } from '../../../shared/dataHooks/useCityQuery'
import { useCityMutation } from '../../../shared/dataHooks/useCityMutation'
import { MemoizedCityCard } from '../../../shared/CityCard/CityCard'

export interface CityProps {
  id: number
}

export const City: React.VoidFunctionComponent<CityProps> = ({ id }) => {
  const { data: queryData, error: queryError, loading: queryLoading } = useCityQuery(id)
  const { handleCityChange, error: mutateError } = useCityMutation()
  return (
    <MemoizedCityCard
      onCityChange={handleCityChange}
      cityInfo={queryData && queryData.city}
      error={queryError || mutateError}
      loading={queryLoading}
    />
  )
}
