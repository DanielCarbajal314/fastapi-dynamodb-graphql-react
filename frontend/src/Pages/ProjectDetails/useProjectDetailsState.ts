import { useQuery, gql, useMutation } from '@apollo/client';

type Project = {
    id: string;
    name: string;
};

type ProjectResult = {
    project: Project;
};

type TaskState = 'Backlog' | 'Review' | 'Doing' | 'Done';

type Task = {
    id: string;
    title: string;
    description: string;
    state: TaskState;
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

export function useProjectDetailsState(projectId: string) {
    const { data: projectData } = useQuery<ProjectResult>(GET_PROJECT, {
        variables: { projectId },
    });
    const { data: taskData, loading: tasksAreLoading } =
        useQuery<GetTaskResult>(GET_TASKS, { variables: { projectId } });
    const [createTastMutation, { loading: createTaskLoading }] =
        useMutation<CreateTaskResult>(CREATE_TASKS, {
            refetchQueries: [{ query: GET_TASKS }],
        });
    const createTask = ({ title, description }: CreateTaskRequest) =>
        createTastMutation({ variables: { projectId, title, description } });
    return {
        projectName: projectData?.project.name ?? '',
        tasks: taskData?.tasks ?? [],
        createTaskLoading,
        createTask,
        tasksAreLoading,
    };
}
