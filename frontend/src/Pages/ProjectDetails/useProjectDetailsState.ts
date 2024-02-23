import { useQuery, gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import {
    Project,
    SortTasksBy,
    SortingDirection,
    Task,
    TaskSortingField,
} from './Types';

type ProjectResult = {
    project: Project;
};

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

type GetTaskResult = {
    tasks: Task[];
};

type CreateTaskRequest = {
    title: string;
    description: string;
};

type CreateTaskResult = {
    createTask: Task;
};

type UpdateTaskStateRequest = {
    id: string;
    state: string;
};

type UpdateTaskStateResult = {
    updateTaskState: Task;
};

type DeleteTaskResult = {
    deleteTask: {
        id: string;
    };
};

const GET_PROJECT = gql`
    query Project($projectId: String!) {
        project(projectId: $projectId) {
            name
            id
        }
    }
`;

const GET_TASKS = gql`
    query Tasks($projectId: String!) {
        tasks(projectId: $projectId) {
            id
            title
            description
            state
            timestamp
        }
    }
`;

const CREATE_TASKS = gql`
    mutation TaskMutation(
        $projectId: String!
        $title: String!
        $description: String!
    ) {
        createTask(
            description: $description
            title: $title
            projectId: $projectId
        ) {
            id
            title
            description
            state
        }
    }
`;

const UPDATE_TASK_STATE = gql`
    mutation TaskMutation($id: String!, $state: String!) {
        updateTaskState(id: $id, state: $state) {
            id
            title
            description
            state
        }
    }
`;

const DELETE_TASK = gql`
    mutation TaskMutation($id: String!) {
        deleteTask(id: $id) {
            id
        }
    }
`;

const taskStates = ['Backlog', 'Doing', 'Review', 'Done'];

const buildTaskGroups = (
    response: GetTaskResult | undefined,
    sortByFunc: (taskA: Task, taskB: Task) => number,
) => {
    const tasks = response?.tasks ?? [];
    return taskStates.map(state => ({
        stateName: state,
        tasks: tasks.filter(x => x.state === state).sort(sortByFunc),
    }));
};

export function useProjectDetailsState(projectId: string) {
    const [showModal, setShowModal] = useState(false);
    const [sortTasksBy, setSortTasksBy] = useState<SortTasksBy>({
        field: 'creation',
        direction: 'asc',
    });
    const { label: currentSortingLabel, sortingFunction } =
        sortByMap[sortTasksBy.field];
    const sortByFunc = sortingFunction(sortTasksBy.direction);

    const { data: projectData } = useQuery<ProjectResult>(GET_PROJECT, {
        variables: { projectId },
    });
    const { data: taskData, loading: tasksAreLoading } =
        useQuery<GetTaskResult>(GET_TASKS, { variables: { projectId } });
    const [createTastMutation, { loading: createTaskLoading }] =
        useMutation<CreateTaskResult>(CREATE_TASKS, {
            refetchQueries: [{ query: GET_TASKS, variables: { projectId } }],
        });
    const [updateTastStateMutation, { loading: updateTastStateLoading }] =
        useMutation<UpdateTaskStateResult>(UPDATE_TASK_STATE, {
            refetchQueries: [{ query: GET_TASKS, variables: { projectId } }],
        });
    const [deleteTaskMutation, { loading: deleteTaskLoading }] =
        useMutation<DeleteTaskResult>(DELETE_TASK, {
            refetchQueries: [{ query: GET_TASKS, variables: { projectId } }],
        });
    const createTask = ({ title, description }: CreateTaskRequest) =>
        createTastMutation({ variables: { projectId, title, description } });

    const deleteTask = (id: string) =>
        deleteTaskMutation({ variables: { id } });

    const setTaskSortByDirection = (direction: SortingDirection) =>
        setSortTasksBy(sort => ({ ...sort, direction }));
    const setTaskSortByField = (field: TaskSortingField) =>
        setSortTasksBy(sort => ({ ...sort, field }));

    const updateTaskState = ({ id, state }: UpdateTaskStateRequest) =>
        updateTastStateMutation({ variables: { id, state } });
    return {
        projectName: projectData?.project.name ?? '',
        tasksGroups: buildTaskGroups(taskData, sortByFunc),
        createTaskLoading,
        updateTastStateLoading,
        deleteTaskLoading,
        createTask,
        updateTaskState,
        tasksAreLoading,
        showModal,
        setShowModal,
        deleteTask,
        setTaskSortByDirection,
        setTaskSortByField,
        sortTasksBy,
        currentSortingLabel,
    };
}
