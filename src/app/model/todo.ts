export class Todo {
    id: number = 0;
    title: string = '';
    description: string = '';
    status: 'pending' | 'completed' = 'pending';
    dueDate: string = '';  // Add due date field
  }
  