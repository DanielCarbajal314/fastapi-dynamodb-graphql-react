import { useQuery, gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Project = {
    id: string;
    name: string;
};

type ProjectResult = {
    projects: Project[];
};

type CreateProjectResult = {
    createProject: Project;
};

const GET_PROJECTS = gql`
    {
        projects {
            name
            id
        }
    }
`;

const CREATE_PROJECTS = gql`
    mutation ProjectMutations($name: String!) {
        createProject(name: $name) {
            name
            id
        }
    }
`;

export function UseProjectState() {
    const [newProjectName, setNewProjectName] = useState('');
    const { loading, data: projectData } =
        useQuery<ProjectResult>(GET_PROJECTS);
    const projects = projectData?.projects ?? [];
    const [createUserMutation, { loading: createUserLoading }] =
        useMutation<CreateProjectResult>(CREATE_PROJECTS, {
            refetchQueries: [{ query: GET_PROJECTS }],
        });
    const createUser = (name: string) =>
        createUserMutation({ variables: { name } });
    const navigate = useNavigate();
    const onCreateProjectClicked = () => {
        createUser(newProjectName);
        setNewProjectName('');
    };
    const onProjectClickedHandler = (projectId: string) => () => {
        navigate(`/projects/${projectId}`);
    };
    return {
        projectsAreLoading: loading,
        projects,
        createUserLoading,
        newProjectName,
        setNewProjectName,
        onProjectClickedHandler,
        onCreateProjectClicked,
    };
}
