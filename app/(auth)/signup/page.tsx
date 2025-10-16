'use client'

import { useState } from 'react'
import {
  Box,
  Center,
  Stack,
  Text,
  Input,
  Button,
  Heading,
  useToast,
} from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import dynamic from 'next/dynamic'
import { Box as ChakraBox } from '@chakra-ui/react'

import { Features } from '../../../components/features'
import { BackgroundGradient } from '../../../components/gradients/background-gradient'
import { PageTransition } from '../../../components/motion/page-transition'
import { Section } from '../../../components/section'
import siteConfig from '../../../data/config'

// Placeholder OAuth buttons
const FaGoogle = dynamic(() => import('react-icons/fa').then(mod => mod.FaGoogle), {
  ssr: false,
  loading: () => <ChakraBox boxSize="20px" bg="gray.200" borderRadius="sm" />,
})

const FaGithub = dynamic(() => import('react-icons/fa').then(mod => mod.FaGithub), {
  ssr: false,
  loading: () => <ChakraBox boxSize="20px" bg="gray.200" borderRadius="sm" />,
})

const Signup: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        toast({
          title: 'Account created successfully!',
          description: 'You can now log in.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
        setEmail('')
        setPassword('')
      } else {
        toast({
          title: 'Signup failed',
          description: data.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section height="100vh" innerWidth="container.xl">
      <BackgroundGradient
        zIndex="-1"
        width={{ base: 'full', lg: '50%' }}
        left="auto"
        right="0"
        borderLeftWidth="1px"
        borderColor="gray.200"
        _dark={{ borderColor: 'gray.700' }}
      />
      <PageTransition height="100%" display="flex" alignItems="center">
        <Stack
          width="100%"
          alignItems={{ base: 'center', lg: 'flex-start' }}
          spacing="20"
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          {/* Left section */}
          <Box pe="20">
            <NextLink href="/">
              <Box
                as={siteConfig.logo}
                width="160px"
                ms="4"
                mb={{ base: 0, lg: 16 }}
              />
            </NextLink>
            <Features
              display={{ base: 'none', lg: 'flex' }}
              columns={1}
              iconSize={4}
              flex="1"
              py="0"
              ps="0"
              maxW={{ base: '100%', xl: '80%' }}
              features={siteConfig.signup.features.map((feature) => ({
                iconPosition: 'left',
                variant: 'left-icon',
                ...feature,
              }))}
            />
          </Box>

          {/* Signup form */}
          <Center height="100%" flex="1">
            <Box width="container.sm" pt="8" px="8">
              <Heading mb="6">{siteConfig.signup.title || 'Sign Up'}</Heading>

              {/* Placeholder OAuth buttons */}
              <Stack spacing="6" mb="10">
                <Button leftIcon={<FaGoogle />} colorScheme="gray" variant="outline">
                  Sign up with Google
                </Button>
                <Button leftIcon={<FaGithub />} colorScheme="gray" variant="outline">
                  Sign up with GitHub
                </Button>
              </Stack>

              <Text textAlign="center" my="8" color="gray.400">
                — or continue with —
              </Text>

              {/* Email/password form */}
              <form onSubmit={handleSignup}>
                <Stack spacing="6">
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={loading}
                    loadingText="Signing up..."
                  >
                    Sign Up
                  </Button>
                </Stack>
              </form>

              {/* Already have an account */}
              <Text mt="8" fontSize="sm">
                Already have an account?{' '}
                <Link href="/login" color="blue.400">
                  Log in
                </Link>
              </Text>

              {/* Terms and Conditions */}
              <Text color="muted" fontSize="sm" mt="2">
                By signing up you agree to our{' '}
                <Link href={siteConfig.termsUrl} color="white">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href={siteConfig.privacyUrl} color="white">
                  Privacy Policy
                </Link>
              </Text>
            </Box>
          </Center>
        </Stack>
      </PageTransition>
    </Section>
  )
}

export default Signup
