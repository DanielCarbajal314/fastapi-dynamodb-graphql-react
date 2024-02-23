import { gql, useQuery } from '@apollo/client';
import { Task } from '../../Types';

type GetTaskResult = {
    tasks: Task[];
};

export const GET_TASKS = gql`
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

export function useTaskList(projectId: string) {
    const options = { variables: { projectId } };
    const { data: taskData, loading: tasksAreLoading } =
        useQuery<GetTaskResult>(GET_TASKS, options);
    const tasks = taskData?.tasks ?? [];
    return {
        tasks,
        tasksAreLoading,
    };
}
