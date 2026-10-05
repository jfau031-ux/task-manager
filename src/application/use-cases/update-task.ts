import { NotFoundError } from '../errors/not-found.error.js';
import type { Task } from '../../domain/entities/task.js';
import type { TaskRepository } from '../../domain/repositories/task.repository.js';

export interface UpdateTaskInput {
  id: number;
  title?: string;
  description?: string | null;
  completed?: boolean;
}

export class UpdateTask {
  constructor(private readonly repository: TaskRepository) {}

  async execute(input: UpdateTaskInput): Promise<Task> {
    const { id, ...changes } = input;

    const task = await this.repository.update(id, changes);

    if (task === null) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }

    return task;
  }
}
