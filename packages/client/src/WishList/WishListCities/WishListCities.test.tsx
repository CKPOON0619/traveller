import { render, screen } from '@testing-library/react'
import { WishListCities } from './WishListCities'
import { useWishListCitiesQuery } from '../../hooks/useWishListCitiesQuery'
import type { ApolloError } from '@apollo/client'

jest.mock('./../../hooks/useWishListCitiesQuery')
const mockedUseWishListCitiesQuery = useWishListCitiesQuery as jest.Mock
jest.mock('./City', () => ({
  City: ({ id }: { id: number }) => {
    return <div>{`city:${id}`}</div>
  },
}))

describe('<WishListCities /> component', () => {
  it('renders the correct loading placeholder', async () => {
    mockedUseWishListCitiesQuery.mockReturnValue({
      loading: true,
      cities: undefined,
      error: undefined,
    })

    render(<WishListCities />)
    expect(await screen.findByText('Loading...')).toBeVisible()
  })
  it('renders the correct error placeholder', async () => {
    mockedUseWishListCitiesQuery.mockReturnValue({
      loading: false,
      cities: undefined,
      error: { message: 'some error' } as ApolloError,
    })

    render(<WishListCities />)
    expect(await screen.findByText('Error :(')).toBeVisible()
  })

  it('should display all the cities returned by the query hook', async () => {
    const cityQueryResults = [
      { id: 1 },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ]

    mockedUseWishListCitiesQuery.mockReturnValue({
      loading: false,
      cities: cityQueryResults,
      error: undefined,
    })

    render(<WishListCities />)
    expect(await screen.findByText('city:1')).toBeVisible()
    expect(await screen.findByText('city:2')).toBeVisible()
    expect(await screen.findByText('city:3')).toBeVisible()
  })
})
