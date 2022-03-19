import React from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { VisitedCities } from './VisitedCities'

export const Visited: React.VoidFunctionComponent = () => (
  <>
    <Heading as="h1">Visited</Heading>
    <Container centerContent maxW="container.md" flexDir="row">
      <VisitedCities />
    </Container>
  </>
)
