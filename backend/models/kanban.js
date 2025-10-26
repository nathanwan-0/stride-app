// models/Kanban.js
import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  id: String,
  title: String,
  deadline: { type: String, default: '' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
})

const columnSchema = new mongoose.Schema({
  id: String,
  title: String,
  tasks: [taskSchema],
})

const kanbanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  columns: [columnSchema],
})

const Kanban = mongoose.model('Kanban', kanbanSchema)
export default Kanban
