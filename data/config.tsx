import { Button } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaGithub } from 'react-icons/fa'
import { SiX } from 'react-icons/si'
import { FiCheck } from 'react-icons/fi'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'Stride',
    description: 'Organize tasks, track progress, and improve your workflow.',
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        id: 'features',
        label: 'Features',
      },
      {
        id: 'faq',
        label: 'FAQ',
      },
      {
        label: 'Login',
        href: '/login',
      },
      {
        label: 'Sign Up',
        href: '/signup',
        variant: 'primary',
      },
    ],
  },
  footer: {
    copyright: (
      <>
        Built by{' '}
        <Link href="https://github.com/nathanwan-0/stride-app">Stride Team</Link>
      </>
    ),
    links: [
      {
        href: '#',
        label: 'Contact',
      },
      {
        href: 'https://x.com',
        label: <SiX size="14" />,
      },
      {
        href: 'https://github.com/nathanwan-0/',
        label: <FaGithub size="14" />,
      },
    ],
  },
  signup: {
    title: 'Start organizing tasks with Stride',
    features: [
      {
        icon: FiCheck,
        title: 'Task Management',
        description: 'Create, edit, and delete tasks to stay on top of your work.',
      },
      {
        icon: FiCheck,
        title: 'Progress Tracking',
        description: 'Track what’s completed and what still needs to be done.',
      },
      {
        icon: FiCheck,
        title: 'Task Organization',
        description: 'Add categories, deadlines, and priorities to keep tasks structured.',
      },
      {
        icon: FiCheck,
        title: 'Kanban Board',
        description: 'Visualize tasks with a drag-and-drop Kanban board.',
      },
    ],
  },
}

export default siteConfig
