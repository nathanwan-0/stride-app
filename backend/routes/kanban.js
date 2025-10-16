import express from 'express'
import Kanban from '../models/kanban.js'
import { verifyToken } from '../middleware/auth.js' // assumes you already have auth middleware

const router = express.Router()

// GET user's kanban
router.get('/', verifyToken, async (req, res) => {
  try {
    const board = await Kanban.findOne({ userId: req.user.id })
    if (!board) {
      // create a default board
      const newBoard = new Kanban({
        userId: req.user.id,
        columns: [
          { id: 'todo', title: 'To Do', tasks: [] },
          { id: 'progress', title: 'In Progress', tasks: [] },
          { id: 'done', title: 'Done', tasks: [] },
        ],
      })
      await newBoard.save()
      return res.json(newBoard)
    }
    res.json(board)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load board' })
  }
})

// PUT update kanban
router.put('/', verifyToken, async (req, res) => {
  try {
    const { columns } = req.body
    let board = await Kanban.findOne({ userId: req.user.id })

    if (!board) {
      board = new Kanban({ userId: req.user.id, columns })
    } else {
      board.columns = columns
    }

    await board.save()
    res.json(board)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to save board' })
  }
})

export default router
