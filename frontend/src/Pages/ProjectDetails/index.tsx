import { useParams } from 'react-router-dom';
import { useProjectDetailsState } from './hooks/useProjectDetailsState';
import { Button, CloseButton } from '../../Components';
import { TaskModal } from './components/TaskModal';
import { useDragState } from './hooks/useDragState';
import { SortingFilter } from './components/SortingFilter';

export function ProjectDetails() {
    const { projectId } = useParams();
    const {
        isDragingOver,
        enteringDragArea,
        leavingingDragArea,
        draggedTaskId,
        setDraggedTaskId,
        clearActiveState,
    } = useDragState();
    const {
        projectName,
        tasksGroups,
        showModal,
        setShowModal,
        createTask,
        updateTask,
        deleteTask,
        setTaskSortByDirection,
        setTaskSortByField,
    } = useProjectDetailsState(projectId ?? '');
    const openCreateTaskModal = () => setShowModal(true);
    return (
        <div className="w-full flex-col">
            <TaskModal {...{ showModal, setShowModal, createTask }} />
            <div>
                <h5 className="bg-blue-100 text-blue-800 text-xl font-medium me-2 px-2.5 py-2 rounded dark:bg-blue-900 dark:text-blue-300 mb-5 mt-1">
                    {projectName}
                </h5>
            </div>
            <div className="flex items-center justify-between">
                <Button label="Create New Task" onClick={openCreateTaskModal} />
                <SortingFilter
                    {...{ setTaskSortByDirection, setTaskSortByField }}
                />
            </div>
            <div className="flex justify-evenly gap-2 mt-5 h-[700px]">
                {tasksGroups.map(({ tasks, stateName }, index) => (
                    <div
                        className={`w-1/4 ${isDragingOver(stateName) ? 'bg-zinc-700' : ''}`}
                        key={stateName}
                        onDragEnter={enteringDragArea(stateName)}
                        onDragLeave={leavingingDragArea(stateName)}
                        onDrop={e => {
                            e.preventDefault();
                            clearActiveState();
                            updateTask({
                                id: draggedTaskId,
                                state: stateName,
                            });
                        }}
                        onDragOver={e => e.preventDefault()}
                        onDrag={e => {
                            setDraggedTaskId(
                                (e.target as any).getAttribute('task-id'),
                            );
                        }}
                    >
                        <h5
                            className={`bg-purple-100 text-purple-800 text-xl font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-${index + 1}00 border border-purple-400 w-full`}
                        >
                            {stateName}
                        </h5>
                        <div className="flex-col">
                            {tasks.map(
                                ({ id, title, description, timestamp }) => (
                                    <div
                                        key={id}
                                        task-id={id}
                                        draggable={true}
                                        className="block max-w-sm m-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                                    >
                                        <div className="border border-blue-800 border-t-0 border-l-0 border-r-0 border-b-2 flex justify-start pl-5">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white pt-1">
                                                {title}
                                            </h5>
                                            <CloseButton
                                                onClick={() => deleteTask(id)}
                                            />
                                        </div>
                                        <div className="py-4 px-6">
                                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                                {description}
                                            </p>
                                        </div>
                                        <div className="border border-blue-800 border-t-2 border-l-0 border-r-0 border-b-0 flex justify-end pl-5 p-2">
                                            <p className="font-normal text-gray-700 dark:text-gray-600 text-xs">
                                                {new Date(
                                                    timestamp,
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
