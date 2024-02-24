import { useDragState } from '../hooks/useDragState';
import { TaskGroup } from '../hooks/useTaskSortingState';
import { TaskCard } from './TaskCard';
import { UpdateTask } from './UpdateTaskModal';

type TasksBoardProps = {
    tasksGroups: TaskGroup[];
    deleteTask: (taskId: string) => void;
    updateTaskState: (request: { id: string; state: string }) => void;
    updateTask: (request: UpdateTask) => void;
};

export function TasksBoard({
    tasksGroups,
    deleteTask,
    updateTaskState,
    updateTask,
}: TasksBoardProps) {
    const {
        isDragingOver,
        enteringDragArea,
        leavingingDragArea,
        draggedTaskId,
        setDraggedTaskId,
        clearActiveState,
    } = useDragState();
    return (
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
                        updateTaskState({
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
                        {tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                {...{ task, deleteTask, updateTask }}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
