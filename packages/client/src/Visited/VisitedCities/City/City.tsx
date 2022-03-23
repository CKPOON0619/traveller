import * as React from 'react'
import { useCityMutation } from '../../../hooks/useCityMutation'
import { MemoizedCityCard } from '../../../components/CityCard/CityCard'

export interface CityProps {
  id: number
  name: string
  country: string
  wishlist: boolean
}

export const City: React.VoidFunctionComponent<CityProps> = ({ id, name, country, wishlist }) => {
  const { handleCityChange, error: mutateError, updatedCityUserConfig } = useCityMutation()

  return (
    <MemoizedCityCard
      onCityChange={handleCityChange}
      cityInfo={{
        id,
        name,
        country,
        wishlist: (updatedCityUserConfig && updatedCityUserConfig.wishlist) || wishlist,
      }}
      error={mutateError}
    />
  )
}
