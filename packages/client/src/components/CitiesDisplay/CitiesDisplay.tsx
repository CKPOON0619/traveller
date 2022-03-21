import React from 'react'
import { SimpleGrid, Spinner, Alert, AlertIcon, Square, Flex } from '@chakra-ui/react'
import type { ApolloError } from '@apollo/client'

export const CitiesDisplay: React.FunctionComponent<{
  loading?: boolean
  error?: ApolloError
  children?: React.ReactNode
}> = ({ loading, error, children }) => {
  const [showSpinner, setShowSpinner] = React.useState<boolean>(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>()
  React.useEffect(() => {
    if (loading) {
      timeoutRef.current = setTimeout(() => setShowSpinner(true), 1000)
    } else {
      setShowSpinner(false)
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
      }
    }
  }, [loading])

  if (!error && loading === false && (!children || (Array.isArray(children) && children.length === 0))) {
    return (
      <Alert marginTop="40px" aria-label="No results found" status="info">
        <AlertIcon />
        No results.
      </Alert>
    )
  }

  if (loading && showSpinner) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <Square size="150px">
          <Spinner aria-label="loading..." color="blue.400" />
        </Square>
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <Alert margin="40px" aria-label="error" status="error">
          <AlertIcon />
          There was an error processing your request.
        </Alert>
      </Flex>
    )
  }

  return (
    <SimpleGrid minWidth="800px" minChildWidth="200px" spacing="40px" paddingTop="40px">
      {children}
    </SimpleGrid>
  )
}
