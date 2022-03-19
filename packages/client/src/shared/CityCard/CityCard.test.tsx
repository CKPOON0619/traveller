import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { screen, render, fireEvent } from '@testing-library/react'
import { CityCard } from './CityCard'
import type { ApolloError } from '@apollo/client'
// { id: 1, name: 'Test City', country: 'Test country', visited: true, wishlist: true }

describe('<CityCard /> component', () => {
  const testId = 'CityCard'
  const wishText = 'I Wish!'
  const visitText = 'Visited'
  const cityFacts = { id: 1, name: 'Test city', country: 'Test country' }
  const cityUserConfig = { visited: true, wishlist: true }

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
    expect(await screen.findByTestId(testId)).not.toContain(wishText)
    expect(await screen.findByTestId(testId)).not.toContain(visitText)
  })
  it('renders the Card with optional CityUserConfig when given', async () => {
    render(
      <CityCard
        cityInfo={{ ...cityFacts, ...cityUserConfig }}
        error={undefined}
        loading={false}
        onCityChange={() => {}}
      />
    )
    expect(await screen.findByText(wishText)).toBeVisible()
    expect(await screen.findByText(visitText)).toBeVisible()
  })
  it('calls mutation handler with correct data', async () => {
    const cityUserConfig = { visited: true, wishlist: true }
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
    const visitButton = await screen.findByText(visitText)
    fireEvent.click(wishButton)
    expect(jestCityChange).toBeCalledWith({ id: 1, wishlist: false })
    fireEvent.click(visitButton)
    expect(jestCityChange).toBeCalledWith({ id: 1, visited: false })
  })
})
