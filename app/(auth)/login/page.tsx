'use client'

import { useRouter } from 'next/navigation'
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
import { CheckCircle, AlertTriangle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Box as ChakraBox } from '@chakra-ui/react'

import { BackgroundGradient } from '../../../components/gradients/background-gradient'
import { PageTransition } from '../../../components/motion/page-transition'
import { Section } from '../../../components/section'

// Placeholder OAuth buttons
const FaGoogle = dynamic(() => import('react-icons/fa').then(mod => mod.FaGoogle), {
  ssr: false,
  loading: () => <ChakraBox boxSize="20px" bg="gray.200" borderRadius="sm" />,
})

const FaGithub = dynamic(() => import('react-icons/fa').then(mod => mod.FaGithub), {
  ssr: false,
  loading: () => <ChakraBox boxSize="20px" bg="gray.200" borderRadius="sm" />,
})

const Login: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const router = useRouter()


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
      toast({
        duration: 4000,
        isClosable: true,
        render: () => (
          <Box
            bg="primary.500"
            color="white"
            px={4}
            py={3}
            borderRadius="md"
            boxShadow="lg"
            display="flex"
            alignItems="center"
            gap={3}
          >
            <CheckCircle size={22} />
            <Box>
              <Text fontWeight="bold">Logged in successfully!</Text>
              <Text>Welcome back!</Text>
            </Box>
          </Box>
        ),
      })

      setEmail('')
      setPassword('')
      localStorage.setItem('token', data.token)
      router.push('/kanban')
    } else {
      toast({
        duration: 4000,
        isClosable: true,
        render: () => (
          <Box
            bg="red.500"
            color="white"
            px={4}
            py={3}
            borderRadius="md"
            boxShadow="lg"
            display="flex"
            alignItems="center"
            gap={3}
          >
            <AlertTriangle size={22} />
            <Box>
              <Text fontWeight="bold">Login failed</Text>
              <Text>{data.message}</Text>
            </Box>
          </Box>
        ),
      })
    }
  } catch (err: any) {
    toast({
      duration: 4000,
      isClosable: true,
      render: () => (
        <Box
          bg="red.600"
          color="white"
          px={4}
          py={3}
          borderRadius="md"
          boxShadow="lg"
          display="flex"
          alignItems="center"
          gap={3}
        >
          <AlertTriangle size={22} />
          <Box>
            <Text fontWeight="bold">Error</Text>
            <Text>{err.message}</Text>
          </Box>
        </Box>
      ),
    })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section height="100vh" innerWidth="container.sm">
      <BackgroundGradient zIndex="-1" />
      <Center height="100%">
        <PageTransition width="100%">
          <Box>
            <Heading mb="6">Log In</Heading>

            {/* OAuth buttons */}
            <Stack spacing="4" mb="6">
              <Button leftIcon={<FaGoogle />} colorScheme="gray" variant="outline">
                Log in with Google
              </Button>
              <Button leftIcon={<FaGithub />} colorScheme="gray" variant="outline">
                Log in with GitHub
              </Button>
            </Stack>

            <Text textAlign="center" my="4" color="gray.400">
              — or continue with email —
            </Text>

            {/* Email/password form */}
            <form onSubmit={handleLogin}>
              <Stack spacing="4">
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
                  loadingText="Logging in..."
                >
                  Log In
                </Button>
              </Stack>
            </form>

            <Text mt="6" fontSize="sm">
              Don't have an account?{' '}
              <Link href="/signup" color="blue.400">
                Sign up
              </Link>
            </Text>
          </Box>
        </PageTransition>
      </Center>
    </Section>
  )
}

export default Login
