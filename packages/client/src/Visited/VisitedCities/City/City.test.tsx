import { screen, render, fireEvent } from '@testing-library/react'
import { City } from './City'
import { useCityQuery } from '../../../hooks/useCityQuery'
import { useCityMutation } from '../../../hooks/useCityMutation'
import type { ApolloError } from '@apollo/client'
jest.mock('../../../hooks/useCityQuery')
jest.mock('../../../hooks/useCityMutation')
const mockedUseCityQuery = useCityQuery as jest.Mock
const mockeduseCityMutation = useCityMutation as jest.Mock

describe('<City /> component for Visited page', () => {
  const wishText = 'I Wish!'
  const visitText = 'Visited'

  it('renders the correct loading placeholder', async () => {
    mockedUseCityQuery.mockReturnValue({
      loading: true,
      city: undefined,
      error: undefined,
    })
    const cityMutationUpdate = jest.fn()
    mockeduseCityMutation.mockReturnValue({
      handleCityChange: cityMutationUpdate,
      error: undefined,
    })
    render(<City id={1} />)
    expect(await screen.findByText('Loading...')).toBeVisible()
  })
  it('renders the correct error placeholder', async () => {
    mockedUseCityQuery.mockReturnValue({
      loading: false,
      city: undefined,
      error: { message: 'some error' } as ApolloError,
    })
    const cityMutationUpdate = jest.fn()
    mockeduseCityMutation.mockReturnValue({
      handleCityChange: cityMutationUpdate,
      error: undefined,
    })
    render(<City id={1} />)
    expect(await screen.findByText('Error :(')).toBeVisible()
  })
  it('renders the Card with CityFacts and ONLY wishlist button', async () => {
    mockedUseCityQuery.mockReturnValue({
      loading: false,
      city: {
        name: 'Test city',
        country: 'Test country',
        wishlist: true,
        visited: true,
      },
      error: undefined,
    })
    const cityMutationUpdate = jest.fn()
    mockeduseCityMutation.mockReturnValue({
      handleCityChange: cityMutationUpdate,
      error: undefined,
    })
    render(
      <div data-testid="test-card">
        <City id={1} />
      </div>
    )
    expect(await screen.findByText('Test city')).toBeVisible()
    expect(await screen.findByText('Test country')).toBeVisible()
    expect(await screen.findByText(wishText)).toBeVisible()
    expect(await screen.findByTestId('test-card')).not.toHaveTextContent(visitText)
  })
  describe('calls mutation handler with correct data', () => {
    it('when is it already in the list, clicking the button would remove it from the list', async () => {
      mockedUseCityQuery.mockReturnValue({
        loading: false,
        city: {
          id: 1,
          name: 'Test city',
          country: 'Test country',
          wishlist: true,
          visited: true,
        },
        error: undefined,
      })
      const cityMutationUpdate = jest.fn()
      mockeduseCityMutation.mockReturnValue({
        handleCityChange: cityMutationUpdate,
        error: undefined,
      })
      render(<City id={1} />)
      const wishButton = await screen.findByText(wishText)
      fireEvent.click(wishButton)
      expect(cityMutationUpdate).toBeCalledWith({ id: 1, wishlist: false })
      expect(await screen.findByText('Test city')).toBeVisible()
      expect(await screen.findByText('Test country')).toBeVisible()
    })
    it('when is it not in the list, clicking the button would add it to the list', async () => {
      mockedUseCityQuery.mockReturnValue({
        loading: false,
        city: {
          id: 1,
          name: 'Test city',
          country: 'Test country',
          wishlist: false,
          visited: false,
        },
        error: undefined,
      })
      const cityMutationUpdate = jest.fn()
      mockeduseCityMutation.mockReturnValue({
        handleCityChange: cityMutationUpdate,
        error: undefined,
      })
      render(<City id={1} />)
      const wishButton = await screen.findByText(wishText)
      fireEvent.click(wishButton)
      expect(cityMutationUpdate).toBeCalledWith({ id: 1, wishlist: true })
      expect(await screen.findByText('Test city')).toBeVisible()
      expect(await screen.findByText('Test country')).toBeVisible()
    })
  })
})
