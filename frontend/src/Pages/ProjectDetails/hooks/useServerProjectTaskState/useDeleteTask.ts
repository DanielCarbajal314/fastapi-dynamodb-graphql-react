import { gql, useMutation } from '@apollo/client';
import { GET_TASKS } from './useTaskList';

type DeleteTaskResult = {
    deleteTask: {
        id: string;
    };
};

const DELETE_TASK = gql`
    mutation TaskMutation($id: String!) {
        deleteTask(id: $id) {
            id
        }
    }
`;

export function useDeleteTask(projectId: string) {
    const [deleteTaskMutation, { loading: deleteTaskLoading }] =
        useMutation<DeleteTaskResult>(DELETE_TASK, {
            refetchQueries: [{ query: GET_TASKS, variables: { projectId } }],
        });

    const deleteTask = (id: string) => {
        deleteTaskMutation({ variables: { id } });
    };

    return {
        deleteTaskLoading,
        deleteTask,
    };
}
