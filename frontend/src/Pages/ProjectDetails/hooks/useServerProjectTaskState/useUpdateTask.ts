import { gql, useMutation } from '@apollo/client';
import { GET_TASKS } from './useTaskList';
import { Task } from '../../Types';

type UpdateTaskRequest = {
    id: string;
    state: string;
    title: string;
    description: string;
};

type UpdateTaskResult = {
    updateTask: Task;
};

const UPDATE_TASK = gql`
    mutation TaskMutation(
        $id: String!
        $state: String!
        $description: String!
        $title: String!
    ) {
        updateTask(
            id: $id
            state: $state
            description: $description
            title: $title
        ) {
            id
            title
            description
            state
        }
    }
`;

export function useUpdateTask(projectId: string) {
    const [updateTastStateMutation, { loading: updateTaskLoading }] =
        useMutation<UpdateTaskResult>(UPDATE_TASK, {
            refetchQueries: [{ query: GET_TASKS, variables: { projectId } }],
        });
    const updateTask = (variables: UpdateTaskRequest) => {
        updateTastStateMutation({ variables });
    };
    return {
        updateTask,
        updateTaskLoading,
    };
}
