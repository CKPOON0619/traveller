import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import type { ApolloError } from '@apollo/client'

export const CitiesDisplay: React.FunctionComponent<{
  loading?: boolean
  error?: ApolloError
  children?: React.ReactNode
}> = ({ loading, error, children }) => {
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error :(</p>
  }

  return (
    <SimpleGrid minChildWidth="120px" spacing="40px" paddingTop="40px">
      {children || <p>Empty</p>}
    </SimpleGrid>
  )
}
