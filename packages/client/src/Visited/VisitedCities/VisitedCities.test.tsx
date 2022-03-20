import { fireEvent, render, screen } from '@testing-library/react'
import { VisitedCities } from './VisitedCities'
import { useVisitedCitiesQuery } from '../../hooks/useVisitedCitiesQuery'
import type { ApolloError } from '@apollo/client'

jest.mock('./../../hooks/useVisitedCitiesQuery')
const mockedUseVisitedCitiesQuery = useVisitedCitiesQuery as jest.Mock
jest.mock('./City', () => ({
  City: ({ id }: { id: number }) => {
    return <div>{`city:${id}`}</div>
  },
}))

describe('<VisitedCities /> component', () => {
  it('renders the correct loading placeholder', async () => {
    mockedUseVisitedCitiesQuery.mockReturnValue({
      loading: true,
      cities: undefined,
      error: undefined,
    })

    render(<VisitedCities />)
    expect(await screen.findByText('Loading...')).toBeVisible()
  })
  it('renders the correct error placeholder', async () => {
    mockedUseVisitedCitiesQuery.mockReturnValue({
      loading: false,
      cities: undefined,
      error: { message: 'some error' } as ApolloError,
    })

    render(<VisitedCities />)
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

    mockedUseVisitedCitiesQuery.mockReturnValue({
      loading: false,
      cities: cityQueryResults,
      error: undefined,
    })

    render(<VisitedCities />)
    expect(await screen.findByText('city:1')).toBeVisible()
    expect(await screen.findByText('city:2')).toBeVisible()
    expect(await screen.findByText('city:3')).toBeVisible()
  })
})
