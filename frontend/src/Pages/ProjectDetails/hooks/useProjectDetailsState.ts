import { useState } from 'react';
import { useServerProjectTaskState } from './useServerProjectTaskState';
import { useTaskSortingState } from './useTaskSortingState';

export function useProjectDetailsState(projectId: string) {
    const [showModal, setShowModal] = useState(false);
    const {
        currentSortingLabel,
        buildTaskGroups,
        setTaskSortByDirection,
        setTaskSortByField,
    } = useTaskSortingState();
    const {
        projectName,
        tasks,
        tasksAreLoading,
        updateTaskStateLoading,
        deleteTaskLoading,
        updateTaskLoading,
        createTaskLoading,
        createTask,
        deleteTask,
        updateTaskState,
        updateTask,
    } = useServerProjectTaskState(projectId);
    return {
        projectName,
        tasksGroups: buildTaskGroups(tasks),
        createTaskLoading,
        updateTaskStateLoading,
        deleteTaskLoading,
        tasksAreLoading,
        showModal,
        updateTaskLoading,
        currentSortingLabel,
        createTask,
        updateTaskState,
        updateTask,
        setShowModal,
        deleteTask,
        setTaskSortByDirection,
        setTaskSortByField,
    };
}
