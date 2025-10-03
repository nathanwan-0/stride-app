'use client'

import { Center } from '@chakra-ui/react'
import { Auth } from '@saas-ui/auth'
import { Link } from '@saas-ui/react'
import { BackgroundGradient } from '../../../components/gradients/background-gradient'
import { PageTransition } from '../../../components/motion/page-transition'
import { Section } from '../../../components/section'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Box } from '@chakra-ui/react'

// Dynamically import icons to avoid server-side function serialization
const FaGoogle = dynamic(() => import('react-icons/fa').then(mod => mod.FaGoogle), {
  ssr: false,
  loading: () => <Box boxSize="20px" bg="gray.200" borderRadius="sm" />
})

const FaGithub = dynamic(() => import('react-icons/fa').then(mod => mod.FaGithub), {
  ssr: false,
  loading: () => <Box boxSize="20px" bg="gray.200" borderRadius="sm" />
})

const providers = {
  google: {
    name: 'Google',
    icon: FaGoogle,
  },
  github: {
    name: 'Github',
    icon: FaGithub,
    variant: 'solid',
  },
}

const Login: NextPage = () => {
  return (
    <Section height="calc(100vh - 200px)" innerWidth="container.sm">
      <BackgroundGradient zIndex="-1" />

      <Center height="100%" pt="20">
        <PageTransition width="100%">
          <Auth
            view="login"
            providers={providers}
            signupLink={<Link href="/signup">Sign up</Link>}
          />
        </PageTransition>
      </Center>
    </Section>
  )
}

export default Login