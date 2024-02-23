import { gql, useMutation } from '@apollo/client';
import { Task } from '../../Types';
import { GET_TASKS } from './useTaskList';

type CreateTaskRequest = {
    title: string;
    description: string;
};

type CreateTaskResult = {
    createTask: Task;
};

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

export function useCreateTask(projectId: string) {
    const [createTastMutation, { loading: createTaskLoading }] =
        useMutation<CreateTaskResult>(CREATE_TASKS, {
            refetchQueries: [{ query: GET_TASKS, variables: { projectId } }],
        });
    const createTask = ({ title, description }: CreateTaskRequest) =>
        createTastMutation({ variables: { projectId, title, description } });

    return {
        createTaskLoading,
        createTask,
    };
}
