import React from 'react'
import { Container, InputRightElement, Input, Heading, InputGroup, IconButton, VStack } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { SearchResult } from './SearchResult'
//TODO: Add search by country
//TODO: Add on demand query for infinite scrolling using offset and limit when no filter is applied
export const Home: React.VoidFunctionComponent = () => {
  const searchRef = React.useRef<HTMLInputElement>(null)
  const [confirmedSearch, setconfirmedSearch] = React.useState<string | undefined>(undefined)

  const handleClickConfirmedSearch = React.useCallback(() => {
    setconfirmedSearch(searchRef.current?.value)
  }, [])
  const handleEnterConfirmedSearch = React.useCallback(e => {
    //TODO: check compatibility across browser and devices
    if (e.key === 'Enter') {
      setconfirmedSearch(searchRef.current?.value)
    }
  }, [])

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.lg">
        <InputGroup>
          <Input data-testid="search-input" ref={searchRef} onKeyDown={handleEnterConfirmedSearch} />
          <InputRightElement
            children={
              <IconButton
                aria-label=""
                icon={<Search2Icon data-testid="search-icon" onClick={handleClickConfirmedSearch} />}
              />
            }
          />
        </InputGroup>
        {confirmedSearch ? <SearchResult searchName={confirmedSearch} /> : null}
      </Container>
    </VStack>
  )
}
