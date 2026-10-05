import { NotFoundError } from '../errors/not-found.error.js';
import type { Task } from '../../domain/entities/task.js';
import type { TaskRepository } from '../../domain/repositories/task.repository.js';

export interface GetTaskInput {
  id: number;
}

export class GetTask {
  constructor(private readonly repository: TaskRepository) {}

  async execute(input: GetTaskInput): Promise<Task> {
    const task = await this.repository.findById(input.id);

    if (task === null) {
      throw new NotFoundError(`Task with id ${input.id} not found`);
    }

    return task;
  }
}
