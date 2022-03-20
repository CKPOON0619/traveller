import React from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { WishListCities } from './WishListCities'

export const WishList: React.VoidFunctionComponent = () => (
  <>
    <Heading as="h1">Wish list</Heading>
    <Container centerContent maxW="container.lg" flexDir="row">
      <WishListCities />
    </Container>
  </>
)
