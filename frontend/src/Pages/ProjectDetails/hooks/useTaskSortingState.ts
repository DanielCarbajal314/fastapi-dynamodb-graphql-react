import { useState } from 'react';
import {
    SortTasksBy,
    SortingDirection,
    Task,
    TaskSortingField,
} from '../Types';

const directionFactor = (direction: SortingDirection) =>
    direction == 'asc' ? 1 : -1;

const sortByMap: Record<
    TaskSortingField,
    {
        label: string;
        sortingFunction: (
            direction: SortingDirection,
        ) => (taskA: Task, taskB: Task) => number;
    }
> = {
    title: {
        label: 'title',
        sortingFunction:
            (direction: SortingDirection) => (taskA: Task, taskB: Task) =>
                directionFactor(direction) *
                taskA.title.localeCompare(taskB.title),
    },
    description: {
        label: 'description',
        sortingFunction:
            (direction: SortingDirection) => (taskA: Task, taskB: Task) =>
                directionFactor(direction) *
                taskA.description.localeCompare(taskB.description),
    },
    creation: {
        label: 'creation time',
        sortingFunction:
            (direction: SortingDirection) => (taskA: Task, taskB: Task) =>
                directionFactor(direction) *
                (taskA.timestamp - taskB.timestamp),
    },
};

const taskStates = ['Backlog', 'Doing', 'Review', 'Done'];

export type TaskGroup = {
    stateName: string;
    tasks: Task[];
};

const buildTaskGroupsFunction =
    (sortByFunc: (taskA: Task, taskB: Task) => number) =>
    (tasks: Task[]): TaskGroup[] => {
        return taskStates.map(state => ({
            stateName: state,
            tasks: tasks.filter(x => x.state === state).sort(sortByFunc),
        }));
    };

export function useTaskSortingState() {
    const [sortTasksBy, setSortTasksBy] = useState<SortTasksBy>({
        field: 'creation',
        direction: 'asc',
    });
    const { label, sortingFunction } = sortByMap[sortTasksBy.field];
    const direction =
        sortTasksBy.direction === 'asc' ? 'ascending' : 'descending';
    const currentSortingLabel = `Sorting by ${label} ${direction}`;
    const sortByFunc = sortingFunction(sortTasksBy.direction);
    const setTaskSortByDirection = (direction: SortingDirection) =>
        setSortTasksBy(sort => ({ ...sort, direction }));
    const setTaskSortByField = (field: TaskSortingField) =>
        setSortTasksBy(sort => ({ ...sort, field }));
    return {
        setTaskSortByDirection,
        setTaskSortByField,
        currentSortingLabel,
        buildTaskGroups: buildTaskGroupsFunction(sortByFunc),
    };
}
