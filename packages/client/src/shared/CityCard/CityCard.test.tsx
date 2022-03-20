import { screen, render, fireEvent } from '@testing-library/react'
import { CityCard } from './CityCard'
import type { ApolloError } from '@apollo/client'

describe('<CityCard /> component', () => {
  const testId = 'CityCard'
  const wishText = 'I Wish!'
  const visitText = 'Visited'
  const cityFacts = { id: 1, name: 'Test city', country: 'Test country' }

  it('renders the correct loading placeholder', async () => {
    render(<CityCard cityInfo={undefined} error={undefined} loading={true} onCityChange={() => {}} />)
    expect(await screen.findByText('Loading...')).toBeVisible()
  })
  it('renders the correct error placeholder', async () => {
    render(
      <CityCard
        cityInfo={undefined}
        error={{ message: 'some error' } as ApolloError}
        loading={false}
        onCityChange={() => {}}
      />
    )
    expect(await screen.findByText('Error :(')).toBeVisible()
  })
  it('renders the Card with only CityFacts when no CityUserConfig given', async () => {
    render(<CityCard cityInfo={cityFacts} error={undefined} loading={false} onCityChange={() => {}} />)
    expect(await screen.findByText(cityFacts.name)).toBeVisible()
    expect(await screen.findByText(cityFacts.country)).toBeVisible()
    const card = await screen.findByTestId(testId)
    expect(card).not.toContain(wishText)
    expect(card).not.toContain(visitText)
  })
  describe('renders the Card with optional CityUserConfig when given', () => {
    it('renders the card with wishlist when provided', async () => {
      render(
        <CityCard
          cityInfo={{ ...cityFacts, wishlist: true }}
          error={undefined}
          loading={false}
          onCityChange={() => {}}
        />
      )
      const card = await screen.findByTestId(testId)
      expect(card).not.toHaveTextContent(visitText)
      expect(card).toHaveTextContent(wishText)
    })
    it('renders the card with visited when provided', async () => {
      render(
        <CityCard
          cityInfo={{ ...cityFacts, visited: true }}
          error={undefined}
          loading={false}
          onCityChange={() => {}}
        />
      )
      const card = await screen.findByTestId(testId)
      expect(card).toHaveTextContent(visitText)
      expect(card).not.toHaveTextContent(wishText)
    })
  })
  describe('calls mutation handler with correct data', () => {
    describe('calls mutation handler correctly with visited click', () => {
      it('should remove the city from visisted list when it is already in the visited list', async () => {
        const cityUserConfig = { visited: true }
        const jestCityChange = jest.fn()
        render(
          <CityCard
            cityInfo={{ ...cityFacts, ...cityUserConfig }}
            error={undefined}
            loading={false}
            onCityChange={jestCityChange}
          />
        )
        const visitButton = await screen.findByText(visitText)
        fireEvent.click(visitButton)
        expect(jestCityChange).toBeCalledWith({ id: 1, visited: false })
      })
      it('should add the city to visisted list when it is not in the visited list', async () => {
        const cityUserConfig = { visited: false }
        const jestCityChange = jest.fn()
        render(
          <CityCard
            cityInfo={{ ...cityFacts, ...cityUserConfig }}
            error={undefined}
            loading={false}
            onCityChange={jestCityChange}
          />
        )
        const visitButton = await screen.findByText(visitText)
        fireEvent.click(visitButton)
        expect(jestCityChange).toBeCalledWith({ id: 1, visited: true })
      })
    })

    describe('calls mutation handler correctly with wishlist click', () => {
      it('should remove city from wishllist is it is already in wishlist', async () => {
        const cityUserConfig = { wishlist: true }
        const jestCityChange = jest.fn()
        render(
          <CityCard
            cityInfo={{ ...cityFacts, ...cityUserConfig }}
            error={undefined}
            loading={false}
            onCityChange={jestCityChange}
          />
        )
        const wishButton = await screen.findByText(wishText)
        fireEvent.click(wishButton)
        expect(jestCityChange).toBeCalledWith({ id: 1, wishlist: false })
      })
      it('should add city to wishllist is it is not in wishlist', async () => {
        const cityUserConfig = { wishlist: false }
        const jestCityChange = jest.fn()
        render(
          <CityCard
            cityInfo={{ ...cityFacts, ...cityUserConfig }}
            error={undefined}
            loading={false}
            onCityChange={jestCityChange}
          />
        )
        const wishButton = await screen.findByText(wishText)
        fireEvent.click(wishButton)
        expect(jestCityChange).toBeCalledWith({ id: 1, wishlist: true })
      })
    })
  })
})
