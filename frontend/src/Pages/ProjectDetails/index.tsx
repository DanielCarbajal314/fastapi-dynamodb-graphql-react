import { useParams } from 'react-router-dom';
import { useProjectDetailsState } from './useProjectDetailsState';

export function ProjectDetails() {
    const { projectId } = useParams();
    const { projectName, tasks } = useProjectDetailsState(projectId ?? '');
    return (
        <div className="w-full flex-col">
            <div>
                <h5 className="bg-blue-100 text-blue-800 text-xl font-medium me-2 px-2.5 py-2 rounded dark:bg-blue-900 dark:text-blue-300 mb-10">
                    {projectName}
                </h5>
            </div>
            <div>
                {tasks.map(({ id, title, description }) => (
                    <div
                        key={id}
                        className="block max-w-sm p-6 m-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {title}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
