export interface Task {
  id?: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function createTask(title: string): Task {
  const now = new Date();

  return {
    title,
    description: null,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
}
