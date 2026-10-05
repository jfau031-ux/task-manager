import { describe, expect, it } from 'vitest';
import { ListTasks } from '../../src/application/use-cases/list-tasks.js';
import type { Task } from '../../src/domain/entities/task.js';
import type { TaskRepository } from '../../src/domain/repositories/task.repository.js';

describe('ListTasks', () => {
  it('should return all tasks through the repository', async () => {
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Learn TypeScript',
        description: 'Study advanced TypeScript',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Build Task Manager',
        description: 'Implement application use cases',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    let findAllCalled = false;

    const repository: TaskRepository = {
      findAll: async () => {
        findAllCalled = true;
        return tasks;
      },
      findById: async () => null,
      create: async () => tasks[0],
      update: async () => null,
      delete: async () => false,
    };

    const listTasks = new ListTasks(repository);

    const result = await listTasks.execute();

    expect(findAllCalled).toBe(true);
    expect(result).toEqual(tasks);
  });

  it('should return an empty array when there are no tasks', async () => {
    const repository: TaskRepository = {
      findAll: async () => [],
      findById: async () => null,
      create: async () => {
        throw new Error('Not implemented');
      },
      update: async () => null,
      delete: async () => false,
    };

    const listTasks = new ListTasks(repository);

    const result = await listTasks.execute();

    expect(result).toEqual([]);
  });
});
