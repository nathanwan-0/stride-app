import {
  chakra,
  Container,
  HTMLChakraProps,
} from '@chakra-ui/react'

export interface SectionProps extends HTMLChakraProps<'div'> {
  children: React.ReactNode
  innerWidth?: string
}

export const Section: React.FC<SectionProps> = (props) => {
  const { children, innerWidth = 'container.lg', ...rest } = props

  return (
    <chakra.div {...rest}>
      <Container height="full" maxW={innerWidth}>
        {children}
      </Container>
    </chakra.div>
  )
}