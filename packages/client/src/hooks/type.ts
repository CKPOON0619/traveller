export interface CityID {
  id: number
}

export interface CityFacts {
  name: string
  country: string
}

export interface CityUserConfig {
  visited: boolean
  wishlist: boolean
}

export type CityMutation = CityID & Partial<CityUserConfig>

export type CityData = CityID & CityFacts & CityUserConfig
