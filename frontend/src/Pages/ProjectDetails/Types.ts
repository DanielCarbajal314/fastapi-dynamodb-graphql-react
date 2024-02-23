export type TaskState = 'Backlog' | 'Review' | 'Doing' | 'Done';
export type TaskSortingField = 'title' | 'description' | 'creation';
export type SortingDirection = 'asc' | 'desc';

export type Task = {
    id: string;
    title: string;
    description: string;
    state: TaskState;
    timestamp: number;
};

export type Project = {
    id: string;
    name: string;
};

export type SortTasksBy = {
    field: TaskSortingField;
    direction: SortingDirection;
};
