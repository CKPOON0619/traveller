import { render, screen } from '@testing-library/react'
import { WishList } from './WishList'

jest.mock('./WishListCities', () => ({
  WishListCities: () => {
    return <div>{`<All cities I wish>`}</div>
  },
}))

describe('<Visited /> component', () => {
  it('renders the Visited header and visited cities', async () => {
    render(<WishList />)
    expect(await screen.findByText('Wish list')).toBeVisible()
    expect(await screen.findByText('<All cities I wish>')).toBeVisible()
  })
})
