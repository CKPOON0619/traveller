import type { ApolloError } from '@apollo/client'
import { Box, Image, Flex, Text, Alert, AlertIcon } from '@chakra-ui/react'
import { MdStar, MdStarBorder, MdAddLocation, MdLocationOn } from 'react-icons/md'

import * as React from 'react'
import type { CityID, CityFacts, CityUserConfig, CityMutation } from '../../hooks/type'

interface CityCardProps {
  cityInfo?: CityID & CityFacts & Partial<CityUserConfig>
  error?: ApolloError
  loading?: boolean
  onCityChange?: (changes: CityMutation) => void
}

export const CityCard: React.VoidFunctionComponent<CityCardProps> = ({ cityInfo, error, loading, onCityChange }) => {
  const handleWishlistChange = React.useCallback(() => {
    if (onCityChange && cityInfo?.wishlist !== undefined) {
      onCityChange({ id: cityInfo.id, wishlist: !cityInfo?.wishlist })
    }
  }, [onCityChange, cityInfo?.wishlist])
  const handleVisitChange = React.useCallback(() => {
    if (onCityChange && cityInfo?.visited !== undefined) {
      onCityChange({ id: cityInfo.id, visited: !cityInfo?.visited })
    }
  }, [onCityChange, cityInfo?.visited])

  if (cityInfo === undefined && loading) {
    return (
      <Box p="5" maxW="320px" borderWidth="1px">
        <Flex mt={2} align="center">
          <Text ml={1} fontSize="sm">
            <b>Loading...</b>
          </Text>
        </Flex>
      </Box>
    )
  }
  if (cityInfo === undefined || error) {
    return (
      <Box p="5" maxW="320px" borderWidth="1px">
        <Flex mt={2} align="center" justifyContent="center">
          <Alert aria-label="error" status="error">
            <AlertIcon />
            Error :(
          </Alert>
        </Flex>
      </Box>
    )
  }

  const { name, country, wishlist, visited } = cityInfo

  return (
    <Box aria-label={`Card of ${name} in ${country}`} p="5" maxW="320px" borderWidth="1px">
      <Image borderRadius="md" src="https://bit.ly/2k1H1t6" />
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        {country}
      </Text>
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        {name}
      </Text>
      {wishlist !== undefined ? (
        <Flex
          role="button"
          aria-label="add to wishlist"
          cursor={onCityChange ? 'pointer' : 'default'}
          onClick={handleWishlistChange}
          mt={2}
          align="center"
        >
          <Box as={wishlist ? MdStar : MdStarBorder} color="orange.400" />
          <Text ml={1} fontSize="sm">
            <b>I Wish!</b>
          </Text>
        </Flex>
      ) : null}
      {visited !== undefined ? (
        <Flex
          role="button"
          aria-label="add to visited"
          cursor={onCityChange ? 'pointer' : 'default'}
          onClick={handleVisitChange}
          mt={2}
          align="center"
        >
          <Box as={visited ? MdLocationOn : MdAddLocation} color={visited ? 'orange.400' : 'gray.400'} />
          <Text ml={1} fontSize="sm">
            <b>Visited</b>
          </Text>
        </Flex>
      ) : null}
    </Box>
  )
}

export const MemoizedCityCard = React.memo(CityCard)
