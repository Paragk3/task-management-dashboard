import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'pending' },
  priority: { type: String, default: 'low' },
  dueDate: { type: Date },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;