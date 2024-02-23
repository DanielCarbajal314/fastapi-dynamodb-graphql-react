import { useState } from 'react';
import { useServerProjectTaskState } from './useServerProjectTaskState';
import { useTaskSortingState } from './useTaskSortingState';

export function useProjectDetailsState(projectId: string) {
    const [showModal, setShowModal] = useState(false);
    const {
        buildTaskGroups,
        setTaskSortByDirection,
        setTaskSortByField,
        currentSortingLabel,
    } = useTaskSortingState();
    const {
        projectName,
        tasks,
        tasksAreLoading,
        createTask,
        createTaskLoading,
        deleteTask,
        updateTask,
        updateTaskLoading,
        deleteTaskLoading,
    } = useServerProjectTaskState(projectId);
    return {
        projectName,
        tasksGroups: buildTaskGroups(tasks),
        createTaskLoading,
        updateTaskLoading,
        deleteTaskLoading,
        createTask,
        updateTask,
        tasksAreLoading,
        showModal,
        setShowModal,
        deleteTask,
        setTaskSortByDirection,
        setTaskSortByField,
        currentSortingLabel,
    };
}
