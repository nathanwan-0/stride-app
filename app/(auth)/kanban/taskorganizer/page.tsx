'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Heading,
  VStack,
  HStack,
  Input,
  Button,
  Select,
  Text,
  useToast,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Tag,
} from '@chakra-ui/react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PageTransition } from '../../../../components/motion/page-transition'

interface Task {
  id: string
  title: string
  deadline: string
  priority: 'Low' | 'Medium' | 'High'
  columnId: string
}

export default function TaskOrganizerPage() {
  const toast = useToast()
  const router = useRouter()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const [tasks, setTasks] = useState<Task[]>([])

  const bg = useColorModeValue('gray.50', 'gray.900')
  const tableBg = useColorModeValue('white', 'gray.800')

  // Fetch Kanban board tasks
  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return
      try {
        const res = await fetch('http://localhost:5000/api/kanban', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        const allTasks = data.columns.flatMap((col: any) =>
          col.tasks.map((task: any) => ({ ...task, columnId: col.id }))
        )
        setTasks(allTasks)
      } catch (err) {
        console.error(err)
        toast({ title: 'Failed to load tasks', status: 'error', duration: 3000 })
      }
    }
    fetchTasks()
  }, [token])

  // Save tasks back into Kanban board
  const saveTasks = async (updatedTasks: Task[]) => {
    if (!token) return
    try {
      const columns = [
        { id: 'todo', title: 'To Do', tasks: updatedTasks.filter((t) => t.columnId === 'todo') },
        { id: 'progress', title: 'In Progress', tasks: updatedTasks.filter((t) => t.columnId === 'progress') },
        { id: 'done', title: 'Done', tasks: updatedTasks.filter((t) => t.columnId === 'done') },
      ]

      await fetch('http://localhost:5000/api/kanban', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ columns }),
      })
    } catch (err) {
      console.error(err)
      toast({ title: 'Failed to save tasks', status: 'error', duration: 3000 })
    }
  }

  const updateTaskField = (id: string, field: keyof Task, value: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, [field]: value } : t
    )
    setTasks(updated)
    saveTasks(updated)
  }

  const removeTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id)
    setTasks(updated)
    saveTasks(updated)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'red'
      case 'Medium':
        return 'yellow'
      case 'Low':
        return 'green'
      default:
        return 'gray'
    }
  }

  return (
    <Box w="100vw" h="100vh" bg={bg} display="flex" flexDirection="column" overflow="hidden">
      <PageTransition display="flex" flex="1" flexDirection="column" px={8} py={6}>
        {/* Header */}
        <Flex justify="space-between" align="center" mb={6}>
          <Heading>Task Organizer</Heading>
          <HStack spacing={4}>
            <Button colorScheme="gray" variant="outline" onClick={() => router.push('/kanban')}>
              Go to Kanban
            </Button>
            <Button colorScheme="red" variant="solid" onClick={handleLogout}>
              Log Out
            </Button>
          </HStack>
        </Flex>

        {/* Task Table */}
        <Box bg={tableBg} p={5} rounded="xl" shadow="md" overflowY="auto" flex="1">
          {tasks.length === 0 ? (
            <Text color="gray.500" textAlign="center">
              No tasks found — add some in your Kanban board.
            </Text>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Task</Th>
                  <Th>Deadline</Th>
                  <Th>Priority</Th>
                  <Th>Column</Th>
                  <Th textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tasks.map((task) => (
                  <Tr key={task.id}>
                    <Td>{task.title}</Td>
                    <Td>
                      <Input
                        type="date"
                        size="sm"
                        value={task.deadline || ''}
                        onChange={(e) => updateTaskField(task.id, 'deadline', e.target.value)}
                      />
                    </Td>
                    <Td>
                      <HStack>
                        <Tag
                          size="md"
                          colorScheme={getPriorityColor(task.priority)}
                          fontWeight="semibold"
                        >
                          {task.priority}
                        </Tag>
                        <Select
                          size="sm"
                          value={task.priority || 'Medium'}
                          onChange={(e) =>
                            updateTaskField(task.id, 'priority', e.target.value as 'Low' | 'Medium' | 'High')
                          }
                          w="110px"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </Select>
                      </HStack>
                    </Td>
                    <Td textTransform="capitalize">{task.columnId.replace('-', ' ')}</Td>
                    <Td textAlign="center">
                      <IconButton
                        aria-label="Delete"
                        icon={<Trash2 size={16} />}
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeTask(task.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </PageTransition>
    </Box>
  )
}
