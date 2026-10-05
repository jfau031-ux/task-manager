import { describe, expect, it } from 'vitest';
import { CreateTask } from './../../src/application/use-cases/create-task.js';
import type { Task } from '../../src/domain/entities/task.js';
import type { TaskRepository } from '../../src/domain/repositories/task.repository.js';

describe('CreateTask', () => {
  it('should create a task through the repository', async () => {
    const createdTask: Task = {
      id: 1,
      title: 'Learn TypeScript',
      description: 'Study application architecture',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let receivedTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> | null = null;

    const repository: TaskRepository = {
      findAll: async () => [],
      findById: async () => null,
      create: async (task) => {
        receivedTask = task;
        return createdTask;
      },
      update: async () => null,
      delete: async () => false,
    };

    const input = {
      title: 'Learn TypeScript',
      description: 'Study application architecture',
      completed: false,
    };

    const createTask = new CreateTask(repository);

    const result = await createTask.execute(input);

    expect(receivedTask).toMatchObject(input);
    expect(result).toEqual(createdTask);
  });
});
