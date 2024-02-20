import { Button } from '../../Components';
import { UseProjectState } from './UseProjectState';

export function ProjectList() {
    const {
        projects,
        createUserLoading,
        newProjectName,
        setNewProjectName,
        onProjectClickedHandler,
        onCreateProjectClicked,
    } = UseProjectState();
    return (
        <div className="w-full h-full">
            <div className="flex justify-start gap-10">
                <div>
                    <div className="mb-5">
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Project's name"
                            value={newProjectName}
                            onChange={e => setNewProjectName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <Button
                    disabled={createUserLoading}
                    onClick={onCreateProjectClicked}
                    label="Create Project"
                />
            </div>
            <div className="flex gap-10 flex-wrap mt-10">
                {projects.map(({ id, name }) => (
                    <div
                        key={id}
                        className="m-2 w-1/2 max-w-sm p-6 dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 border-solid border-2 rounded-md shadow-lg"
                        onClick={onProjectClickedHandler(id)}
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {name}
                        </h5>
                    </div>
                ))}
            </div>
        </div>
    );
}
