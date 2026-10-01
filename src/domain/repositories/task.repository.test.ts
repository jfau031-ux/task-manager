import { describe, expect, it } from 'vitest';
import type { TaskRepository } from './task.repository.js';

describe('TaskRepository', () => {
  it('should define the repository contract', () => {
    const repository: TaskRepository = {
      findAll: async () => [],
      findById: async () => null,
      create: async (task) => ({
        ...task,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      update: async () => null,
      delete: async () => false,
    };

    expect(repository.findAll).toBeDefined();
    expect(repository.findById).toBeDefined();
    expect(repository.create).toBeDefined();
    expect(repository.update).toBeDefined();
    expect(repository.delete).toBeDefined();
  });
});
