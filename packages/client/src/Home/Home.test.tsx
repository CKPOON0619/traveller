import { fireEvent, render, screen } from '@testing-library/react'
import { SearchResult } from './SearchResult'
import type { ApolloError } from '@apollo/client'
import { Home } from './Home'

jest.mock('./SearchResult', () => ({
  SearchResult: ({ searchName }: { searchName: string }) => {
    return <div>{`<search result for ${searchName}>`}</div>
  },
}))

describe('<Home /> component', () => {
  it('should show a search box', async () => {
    render(<Home />)
    expect(await screen.findByTestId('search-input')).toBeVisible()
  })
  it('Upon confirm it should pass the search value to search result component for searching', async () => {
    render(<Home />)
    const inputField = await screen.findByTestId('search-input')
    const searchIcon = await screen.findByTestId('search-icon')
    fireEvent.focus(inputField)
    fireEvent.change(inputField, { target: { value: 'London' } })
    expect(await screen.findByDisplayValue('London')).toBeVisible()
    fireEvent.click(searchIcon)
    expect(await screen.findByText('<search result for London>')).toBeVisible()
    fireEvent.focus(inputField)
    fireEvent.change(inputField, { target: { value: 'Paris' } })
    expect(await screen.findByDisplayValue('Paris')).toBeVisible()
    fireEvent.focus(inputField)
    fireEvent.keyDown(inputField, { key: 'Enter' })
    expect(await screen.findByText('<search result for Paris>')).toBeVisible()
  })
})
