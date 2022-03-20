import { render, screen } from '@testing-library/react'
import { SearchResult } from './SearchResult'
import type { ApolloError } from '@apollo/client'
import { useCitiesSearchQuery } from '../../hooks/useCitiesSearchQuery'

jest.mock('../../hooks/useCitiesSearchQuery')
jest.mock('./City', () => ({
  City: ({ id }: { id: number }) => {
    return <div>{`city:${id}`}</div>
  },
}))

const mockedUseCitiesSearchQuery = useCitiesSearchQuery as jest.Mock

describe('<CitiesDisplay /> component', () => {
  it('renders the correct loading placeholder', async () => {
    mockedUseCitiesSearchQuery.mockReturnValue({
      loading: true,
      cities: undefined,
      error: undefined,
    })

    render(<SearchResult searchName="London" />)
    expect(await screen.findByText('Loading...')).toBeVisible()
  })
  it('renders the correct error placeholder', async () => {
    mockedUseCitiesSearchQuery.mockReturnValue({
      loading: false,
      cities: undefined,
      error: { message: 'some error' } as ApolloError,
    })

    render(<SearchResult searchName="London" />)
    expect(await screen.findByText('Error :(')).toBeVisible()
  })
  it('renders the Card correctly', async () => {
    const cityQueryResults = [
      { id: 1 },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ]

    mockedUseCitiesSearchQuery.mockReturnValue({
      loading: false,
      cities: cityQueryResults,
      error: undefined,
    })

    render(<SearchResult searchName="London" />)
    expect(await screen.findByText('city:1')).toBeVisible()
    expect(await screen.findByText('city:2')).toBeVisible()
    expect(await screen.findByText('city:3')).toBeVisible()
  })
})
