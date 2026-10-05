import type { Task } from '../../domain/entities/task.js';
import type { TaskRepository } from '../../domain/repositories/task.repository.js';

export class ListTasks {
  constructor(private readonly repository: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return this.repository.findAll();
  }
}
