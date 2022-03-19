import React from 'react'
import { render, screen } from '@testing-library/react'
import { CitiesDisplay } from './CitiesDisplay'
import type { ApolloError } from '@apollo/client'

describe('<CitiesDisplay /> component', () => {
  it('renders the correct loading placeholder', async () => {
    render(
      <CitiesDisplay loading={true} error={undefined}>
        Display content
      </CitiesDisplay>
    )
    expect(await screen.findByText('Loading...')).toBeVisible()
  })
  it('renders the correct error placeholder', async () => {
    render(
      <CitiesDisplay loading={false} error={{ message: 'some error' } as ApolloError}>
        Display content
      </CitiesDisplay>
    )
    expect(await screen.findByText('Error :(')).toBeVisible()
  })
})
