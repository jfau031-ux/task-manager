import type { Task } from '../entities/task.js';

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task>;
  update(
    id: number,
    task: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Task | null>;
  delete(id: number): Promise<boolean>;
}
