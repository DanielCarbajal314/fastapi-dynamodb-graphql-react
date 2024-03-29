import { gql, useMutation } from '@apollo/client';
import { GET_TASKS } from './useTaskList';
import { Task } from '../../Types';

type UpdateTaskStateRequest = {
    id: string;
    state: string;
};

type UpdateTaskStateResult = {
    updateTaskState: Task;
};

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

export function useUpdateTaskState(projectId: string) {
    const [updateTastStateMutation, { loading: updateTaskStateLoading }] =
        useMutation<UpdateTaskStateResult>(UPDATE_TASK_STATE, {
            refetchQueries: [{ query: GET_TASKS, variables: { projectId } }],
        });
    const updateTaskState = ({ id, state }: UpdateTaskStateRequest) => {
        updateTastStateMutation({ variables: { id, state } });
    };
    return {
        updateTaskState,
        updateTaskStateLoading,
    };
}
