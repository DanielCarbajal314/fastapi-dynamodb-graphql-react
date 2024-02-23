import { gql, useQuery } from '@apollo/client';
import { Project } from '../../Types';

const GET_PROJECT = gql`
    query Project($projectId: String!) {
        project(projectId: $projectId) {
            name
            id
        }
    }
`;

type ProjectResult = {
    project: Project;
};

export function useProjectData(projectId: string) {
    const { data: projectData } = useQuery<ProjectResult>(GET_PROJECT, {
        variables: { projectId },
    });
    return {
        projectName: projectData?.project.name ?? '',
    };
}
