import { NotFoundError } from '../errors/not-found.error.js';

import type { TaskRepository } from '../../domain/repositories/task.repository.js';

export interface DeleteTaskInput {
  id: number;
}

export class DeleteTask {
  constructor(private readonly repository: TaskRepository) {}

  async execute(input: DeleteTaskInput): Promise<void> {
    const deleted = await this.repository.delete(input.id);

    if (!deleted) {
      throw new NotFoundError(`Task with id ${input.id} not found`);
    }
  }
}
