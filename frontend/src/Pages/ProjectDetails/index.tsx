import { useParams } from 'react-router-dom';
import { useProjectDetailsState } from './hooks/useProjectDetailsState';
import { Button } from '../../Components';
import { TaskModal } from './components/TaskModal';
import { SortingFilter } from './components/SortingFilter';
import { TasksBoard } from './components/TasksBoard';

export function ProjectDetails() {
    const { projectId } = useParams();
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
            <TasksBoard {...{ tasksGroups, deleteTask, updateTask }} />
        </div>
    );
}
