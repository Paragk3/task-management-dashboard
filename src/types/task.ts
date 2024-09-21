export interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'pending' | 'inProgress' | 'done';
    priority: 'low' | 'medium' | 'high';
    dueDate: Date;
  }