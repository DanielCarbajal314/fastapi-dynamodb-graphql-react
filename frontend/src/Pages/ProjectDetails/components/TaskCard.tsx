import { useState } from 'react';
import { CloseButton, EditButton } from '../../../Components';
import { Task } from '../Types';
import { UpdateTask, UpdateTaskModal } from './UpdateTaskModal';

type TaskCardProps = {
    task: Task;
    deleteTask: (id: string) => void;
    updateTask: (request: UpdateTask) => void;
};

export function TaskCard({ task, deleteTask, updateTask }: TaskCardProps) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const { id, description, timestamp, title } = task;
    const showModal = () => setShowUpdateModal(true);
    return (
        <div
            task-id={id}
            draggable={true}
            className="block max-w-sm m-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
            <UpdateTaskModal
                {...{ task, showUpdateModal, setShowUpdateModal, updateTask }}
            />
            <div className="border border-blue-800 border-t-0 border-l-0 border-r-0 border-b-2 flex justify-between pl-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white pt-1">
                    {title}
                </h5>
                <div className="flex justify-end gap-2">
                    <EditButton onClick={showModal} />
                    <CloseButton onClick={() => deleteTask(id)} />
                </div>
            </div>
            <div className="py-4 px-6">
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {description}
                </p>
            </div>
            <div className="border border-blue-800 border-t-2 border-l-0 border-r-0 border-b-0 flex justify-end pl-5 p-2">
                <p className="font-normal text-gray-700 dark:text-gray-600 text-xs">
                    {new Date(timestamp).toLocaleString()}
                </p>
            </div>
        </div>
    );
}
