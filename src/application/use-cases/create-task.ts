import { createTask, type Task } from './../../domain/entities/task.js';
import type { TaskRepository } from './../../domain/repositories/task.repository.js';

export interface CreateTaskInput {
  title: string;
  description: string | null;
  completed: boolean;
}

export class CreateTask {
  constructor(private readonly repository: TaskRepository) {}

  async execute(input: CreateTaskInput): Promise<Task> {
    const task = createTask(input.title);

    const taskToCreate = {
      title: task.title,
      description: input.description,
      completed: input.completed,
    };

    return this.repository.create(taskToCreate);
  }
}
