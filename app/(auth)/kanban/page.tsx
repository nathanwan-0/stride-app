'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  useToast,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
} from '@chakra-ui/react'
import { Plus, Trash2 } from 'lucide-react'
import { PageTransition } from '../../../components/motion/page-transition'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

interface Task {
  id: string
  title: string
}

interface Column {
  id: string
  title: string
  tasks: Task[]
  newTask?: string
}

export default function KanbanPage() {
  const toast = useToast()
  const router = useRouter()
  const [columns, setColumns] = useState<Column[]>([])
  const token = localStorage.getItem('token')
  const bg = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  // Load Kanban board on mount
  useEffect(() => {
    const fetchBoard = async () => {
      if (!token) return
      try {
        const res = await fetch('http://localhost:5000/api/kanban', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setColumns(
          data.columns.map((col: Column) => ({
            ...col,
            newTask: '',
          }))
        )
      } catch (err) {
        console.error(err)
        toast({ title: 'Failed to load board', status: 'error', duration: 3000 })
      }
    }
    fetchBoard()
  }, [token])

  // Save board to backend
  const saveBoard = async (updatedColumns: Column[]) => {
    if (!token) return
    try {
      await fetch('http://localhost:5000/api/kanban', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ columns: updatedColumns.map(({ newTask, ...rest }) => rest) }),
      })
    } catch (err) {
      console.error(err)
      toast({ title: 'Failed to save board', status: 'error', duration: 3000 })
    }
  }

  const addTask = (colId: string) => {
    const updatedColumns = columns.map((col) =>
      col.id === colId && col.newTask?.trim()
        ? {
            ...col,
            tasks: [...col.tasks, { id: Date.now().toString(), title: col.newTask }],
            newTask: '',
          }
        : col
    )
    setColumns(updatedColumns)
    saveBoard(updatedColumns)
  }

  const removeTask = (colId: string, taskId: string) => {
    const updatedColumns = columns.map((col) =>
      col.id === colId ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) } : col
    )
    setColumns(updatedColumns)
    saveBoard(updatedColumns)
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    const sourceColIndex = columns.findIndex((c) => c.id === source.droppableId)
    const destColIndex = columns.findIndex((c) => c.id === destination.droppableId)

    const sourceCol = columns[sourceColIndex]
    const destCol = columns[destColIndex]

    if (sourceCol === destCol) {
      const newTasks = Array.from(sourceCol.tasks)
      const [movedTask] = newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, movedTask)

      const updatedColumns = columns.map((col, idx) =>
        idx === sourceColIndex ? { ...col, tasks: newTasks } : col
      )

      setColumns(updatedColumns)
      saveBoard(updatedColumns)
      return
    }

    const sourceTasks = Array.from(sourceCol.tasks)
    const [movedTask] = sourceTasks.splice(source.index, 1)
    const destTasks = Array.from(destCol.tasks)
    destTasks.splice(destination.index, 0, movedTask)

    const updatedColumns = columns.map((col, idx) => {
      if (idx === sourceColIndex) return { ...col, tasks: sourceTasks }
      if (idx === destColIndex) return { ...col, tasks: destTasks }
      return col
    })

    setColumns(updatedColumns)
    saveBoard(updatedColumns)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  return (
    <Box w="100vw" h="100vh" overflow="hidden" bg={bg} display="flex" flexDirection="column" m={0} p={0}>
      <PageTransition display="flex" flex="1" w="100%" h="100%" alignItems="stretch" justifyContent="center">
        <Flex direction="column" flex="1" px={8} py={6} overflow="hidden" w="100%" h="100%">
          {/* Header Section */}
          <Flex justify="space-between" align="center" mb={6}>
            <Heading>Kanban Board</Heading>
            <HStack spacing={4}>
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => router.push('/kanban/taskorganizer')}
              >
                Task Organizer
              </Button>
              <Button colorScheme="red" variant="outline" onClick={handleLogout}>
                Log Out
              </Button>
            </HStack>
          </Flex>

          <DragDropContext onDragEnd={onDragEnd}>
            <Flex gap={6} justify="flex-start" align="stretch" flex="1" w="100%" overflowX="auto" pb={4}>
              {columns.map((col) => (
                <Droppable droppableId={col.id} key={col.id}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      flex="1"
                      minW="320px"
                      bg={cardBg}
                      borderRadius="2xl"
                      boxShadow="lg"
                      display="flex"
                      flexDirection="column"
                      h="100%"
                      alignSelf="stretch"
                    >
                      <CardHeader borderBottomWidth="1px">
                        <HStack justify="space-between">
                          <Heading size="md">{col.title}</Heading>
                        </HStack>
                      </CardHeader>

                      <CardBody flex="1" overflowY="auto">
                        <VStack align="stretch" spacing={3}>
                          {col.tasks.map((task, index) => (
                            <Draggable draggableId={task.id} index={index} key={task.id}>
                              {(provided) => (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  p={3}
                                  bg={useColorModeValue('gray.100', 'gray.700')}
                                  borderRadius="lg"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Text>{task.title}</Text>
                                  <Button
                                    size="xs"
                                    colorScheme="red"
                                    variant="ghost"
                                    onClick={() => removeTask(col.id, task.id)}
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </Box>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}

                          <HStack mt={2}>
                            <Input
                              placeholder="New task"
                              size="sm"
                              value={col.newTask || ''}
                              onChange={(e) => {
                                const updatedColumns = columns.map((c) =>
                                  c.id === col.id ? { ...c, newTask: e.target.value } : c
                                )
                                setColumns(updatedColumns)
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  addTask(col.id)
                                  e.currentTarget.focus()
                                }
                              }}
                            />
                            <Button
                              size="sm"
                              colorScheme="blue"
                              onClick={() => addTask(col.id)}
                              leftIcon={<Plus size={14} />}
                            >
                              Add
                            </Button>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  )}
                </Droppable>
              ))}
            </Flex>
          </DragDropContext>
        </Flex>
      </PageTransition>
    </Box>
  )
}
