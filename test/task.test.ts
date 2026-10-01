import { describe, expect, it } from 'vitest';
import { createTask } from '../src/domain/entities/task';

describe('Task', () => {
  it('should create a task with default values', () => {
    const task = createTask('Learn TypeScript');

    expect(task.id).toBeUndefined();
    expect(task.title).toBe('Learn TypeScript');
    expect(task.description).toBeNull();
    expect(task.completed).toBe(false);
    expect(task.createdAt).toBeInstanceOf(Date);
    expect(task.updatedAt).toBeInstanceOf(Date);
  });
});
