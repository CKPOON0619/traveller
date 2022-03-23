import { screen, render, fireEvent } from '@testing-library/react'
import { City } from './City'
import { useCityMutation } from '../../../hooks/useCityMutation'
jest.mock('../../../hooks/useCityMutation')
const mockeduseCityMutation = useCityMutation as jest.Mock

describe('<City /> component for Visited page', () => {
  const wishText = 'I Wish!'
  const visitText = 'Visited'
  const cityData = {
    name: 'Test city',
    country: 'Test country',
    wishlist: true,
    visited: true,
  }

  it('renders the Card with CityFacts', async () => {
    const cityMutationUpdate = jest.fn()
    mockeduseCityMutation.mockReturnValue({
      handleCityChange: cityMutationUpdate,
      error: undefined,
    })
    render(<City id={1} {...cityData} />)
    expect(await screen.findByText('Test city')).toBeVisible()
    expect(await screen.findByText('Test country')).toBeVisible()
    expect(await screen.findByText(wishText)).toBeVisible()
    expect(await screen.findByText(visitText)).toBeVisible()
  })
  describe('calls mutation handler with correct data', () => {
    it('when is it already in the list, clicking the button would remove it from the list', async () => {
      const cityMutationUpdate = jest.fn()
      mockeduseCityMutation.mockReturnValue({
        handleCityChange: cityMutationUpdate,
        error: undefined,
      })
      render(<City id={1} {...cityData} />)
      const wishButton = await screen.findByText(wishText)
      fireEvent.click(wishButton)
      expect(cityMutationUpdate).toBeCalledWith({ id: 1, wishlist: false })

      const visitButton = await screen.findByText(visitText)
      fireEvent.click(visitButton)
      expect(cityMutationUpdate).toBeCalledWith({ id: 1, visited: false })

      expect(await screen.findByText('Test city')).toBeVisible()
      expect(await screen.findByText('Test country')).toBeVisible()
    })
    it('when is it not in the list, clicking the button would add it to the list', async () => {
      const cityMutationUpdate = jest.fn()
      mockeduseCityMutation.mockReturnValue({
        handleCityChange: cityMutationUpdate,
        error: undefined,
      })
      render(<City id={1} {...cityData} />)
      const wishButton = await screen.findByText(wishText)
      fireEvent.click(wishButton)
      expect(cityMutationUpdate).toBeCalledWith({ id: 1, wishlist: false })

      const visitButton = await screen.findByText(visitText)
      fireEvent.click(visitButton)
      expect(cityMutationUpdate).toBeCalledWith({ id: 1, visited: false })

      expect(await screen.findByText('Test city')).toBeVisible()
      expect(await screen.findByText('Test country')).toBeVisible()
    })
  })
})
