import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { Visited } from './Visited'

jest.mock('./VisitedCities', () => ({
  VisitedCities: () => {
    return <div>{`<All cities visited>`}</div>
  },
}))

describe('<Visited /> component', () => {
  it('renders the Visited header and visited cities', async () => {
    render(<Visited />)
    expect(await screen.findByText('Visited')).toBeVisible()
    expect(await screen.findByText('<All cities visited>')).toBeVisible()
  })
})
