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
        label: 'Title',
        sortingFunction:
            (direction: SortingDirection) => (taskA: Task, taskB: Task) =>
                directionFactor(direction) *
                taskA.title.localeCompare(taskB.title),
    },
    description: {
        label: 'Description',
        sortingFunction:
            (direction: SortingDirection) => (taskA: Task, taskB: Task) =>
                directionFactor(direction) *
                taskA.description.localeCompare(taskB.description),
    },
    creation: {
        label: 'Creation Time',
        sortingFunction:
            (direction: SortingDirection) => (taskA: Task, taskB: Task) =>
                directionFactor(direction) *
                (taskA.timestamp - taskB.timestamp),
    },
};

const taskStates = ['Backlog', 'Doing', 'Review', 'Done'];

const buildTaskGroupsFunction =
    (sortByFunc: (taskA: Task, taskB: Task) => number) => (tasks: Task[]) => {
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
    const { label: currentSortingLabel, sortingFunction } =
        sortByMap[sortTasksBy.field];
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
