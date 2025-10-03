'use client'

import { Box, useColorModeValue } from '@chakra-ui/react'

export interface BackgroundGradientProps {
  hideOverlay?: boolean
  [key: string]: any
}

export const BackgroundGradient = ({ hideOverlay, ...props }: BackgroundGradientProps) => {
  const opacity = useColorModeValue('0.3', '0.5')
  const gradientBg = useColorModeValue('white', 'gray.900')
  
  const fallbackBackground = useColorModeValue(
    `radial-gradient(at top left, var(--chakra-colors-primary-800) 30%, transparent 80%), 
     radial-gradient(at bottom, var(--chakra-colors-secondary-500) 0%, transparent 60%), 
     radial-gradient(at bottom left, var(--chakra-colors-cyan-500) 0%, transparent 50%),
     radial-gradient(at top right, var(--chakra-colors-teal-500), transparent), 
     radial-gradient(at bottom right, var(--chakra-colors-primary-800) 0%, transparent 50%)`,
    
    `radial-gradient(at top left, var(--chakra-colors-primary-600) 30%, transparent 80%), 
     radial-gradient(at bottom, var(--chakra-colors-secondary-300) 0%, transparent 60%), 
     radial-gradient(at bottom left, var(--chakra-colors-cyan-300) 0%, transparent 50%),
     radial-gradient(at top right, var(--chakra-colors-teal-300), transparent), 
     radial-gradient(at bottom right, var(--chakra-colors-primary-600) 0%, transparent 50%)`
  )

  const gradientOverlay = `linear-gradient(0deg, var(--chakra-colors-${gradientBg}) 60%, rgba(0, 0, 0, 0) 100%)`

  return (
    <Box
      backgroundImage={fallbackBackground}
      backgroundBlendMode="saturation"
      position="absolute"
      top="0"
      left="0"
      zIndex="0"
      opacity={opacity}
      height="100vh"
      width="100%"
      overflow="hidden"
      pointerEvents="none"
      {...props}
    >
      {!hideOverlay && (
        <Box
          backgroundImage={gradientOverlay}
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          zIndex="1"
        />
      )}
    </Box>
  )
}