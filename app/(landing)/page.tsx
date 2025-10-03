'use client'

import {
  Box,
  ButtonGroup,
  Container,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { Metadata, NextPage } from 'next'
import Image from 'next/image'
import {
  FiArrowRight,
  FiBox,
  FiCode,
  FiGrid,
  FiLock,
  FiSliders,
  FiTrendingUp,
} from 'react-icons/fi'

import { ButtonLink } from '../../components/button-link/button-link'
import { Faq } from '../../components/faq'
import { Features } from '../../components/features'
import { BackgroundGradient } from '../../components/gradients/background-gradient'
import { Hero } from '../../components/hero'
import { ChakraLogo, NextjsLogo } from '../../components/logos'
import { FallInPlace } from '../../components/motion/fall-in-place'
import { Em } from '../../components/typography'
import faq from '../../data/faq'

export const meta: Metadata = {
  title: 'Stride',
  description:
    'Stride App – a full-stack productivity and task-management web application.',
}

const Home: NextPage = () => {
  return (
    <Box>
      <HeroSection />
      <HighlightsSection />
      <FeaturesSection />
      <FaqSection />
    </Box>
  )
}

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: 'column', lg: 'row' }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Organize tasks
                <br /> and boost productivity
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                <Em>Stride</Em> is a full-stack productivity and task-management
                app. Create, organize, and track tasks with a clean and
                responsive interface.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <HStack pt="4" pb="12" spacing="8">
                <NextjsLogo height="28px" /> <ChakraLogo height="20px" />
              </HStack>

              <ButtonGroup spacing={4} alignItems="center">
                <ButtonLink colorScheme="primary" size="lg" href="/signup">
                  Get Started – Free
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  href="#features"
                  variant="outline"
                  rightIcon={
                    <Icon
                      as={FiArrowRight}
                      sx={{
                        transitionProperty: 'common',
                        transitionDuration: 'normal',
                        '.chakra-button:hover &': {
                          transform: 'translate(5px)',
                        },
                      }}
                    />
                  }
                >
                  Learn More
                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>

          <Box
            height="600px"
            position="absolute"
            display={{ base: 'none', lg: 'block' }}
            left={{ lg: '60%', xl: '55%' }}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace delay={1}>
              <Box overflow="hidden" height="100%">
                <Image
                  src="/static/screenshots/list.png"
                  width={1200}
                  height={762}
                  alt="Screenshot of Stride task list"
                  quality="75"
                  priority
                />
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

/**
 * HighlightsSection
 * - uses plain Chakra layout primitives so we don't accidentally pass unsupported props
 * - centers the card, gives it a comfortable width, and pushes it down (mt/pt)
 */
const HighlightsSection = () => {
  return (
    <Box as="section" pt={{ base: 12, md: 20 }} pb={16} bg="transparent">
      <Container maxW="container.xl">
        <Box display="flex" justifyContent="center">
          {/* card */}
          <Box
            bg="gray.800"
            borderRadius="md"
            p={{ base: 6, md: 8 }}
            boxShadow="sm"
            w="100%"
            maxW={{ base: '100%', md: '900px' }}
            mx="4"
          >
            <Heading size="lg" mb={4}>
              Key Features
            </Heading>

            <Box as="ul" color="gray.300" fontSize="lg" pl={6} lineHeight="tall">
              <li>Create, edit, and delete tasks</li>
              <li>Organize with categories, priorities, and deadlines</li>
              <li>Track progress and completion easily</li>
              <li>Kanban board with drag-and-drop</li>
              <li>User accounts with secure authentication</li>
              <li>REST API built with Express and MongoDB</li>
              <li>Responsive frontend built with Next.js and React</li>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={['2xl', null, '4xl']}
          textAlign="left"
          as="p"
        >
          Built for productivity
        </Heading>
      }
      description="Stride gives you all the tools to manage tasks and projects efficiently."
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: 'Task Management',
          icon: FiBox,
          description: 'Create, edit, and delete tasks quickly.',
          variant: 'inline',
        },
        {
          title: 'Progress Tracking',
          icon: FiTrendingUp,
          description: 'Track your progress and completed work at a glance.',
          variant: 'inline',
        },
        {
          title: 'Organization',
          icon: FiGrid,
          description: 'Use categories, priorities, and deadlines to stay on top.',
          variant: 'inline',
        },
        {
          title: 'Kanban Board',
          icon: FiSliders,
          description: 'Visualize and move tasks with a drag-and-drop board.',
          variant: 'inline',
        },
        {
          title: 'Secure Authentication',
          icon: FiLock,
          description: 'User accounts with JWT/OAuth login support.',
          variant: 'inline',
        },
        {
          title: 'Full-Stack API',
          icon: FiCode,
          description: 'REST API powered by Express and MongoDB.',
          variant: 'inline',
        },
      ]}
    />
  )
}

const FaqSection = () => {
  return <Faq {...faq} />
}

export default Home
