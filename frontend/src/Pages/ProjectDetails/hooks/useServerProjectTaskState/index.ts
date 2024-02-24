import { useCreateTask } from './useCreateTask';
import { useDeleteTask } from './useDeleteTask';
import { useProjectData } from './useProjectData';
import { useTaskList } from './useTaskList';
import { useUpdateTask } from './useUpdateTask';
import { useUpdateTaskState } from './useUpdateTaskState';

export function useServerProjectTaskState(projectId: string) {
    const { projectName } = useProjectData(projectId);
    const { tasks, tasksAreLoading } = useTaskList(projectId);
    const { createTask, createTaskLoading } = useCreateTask(projectId);
    const { deleteTask, deleteTaskLoading } = useDeleteTask(projectId);
    const { updateTaskState, updateTaskStateLoading } =
        useUpdateTaskState(projectId);
    const { updateTask, updateTaskLoading } = useUpdateTask(projectId);
    return {
        projectName,
        tasks,
        tasksAreLoading,
        createTask,
        deleteTask,
        updateTaskState,
        updateTask,
        createTaskLoading,
        deleteTaskLoading,
        updateTaskStateLoading,
        updateTaskLoading,
    };
}
