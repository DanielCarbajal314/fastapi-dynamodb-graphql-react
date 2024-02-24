import { useState } from 'react';
import { Button, CloseButton, SecondaryButton } from '../../../Components';
import { Task, TaskState } from '../Types';

export type UpdateTask = {
    id: string;
    state: string;
    title: string;
    description: string;
};

type UpdateTaskModalProps = {
    showUpdateModal: boolean;
    setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
    task: Task;
    updateTask: (request: UpdateTask) => void;
};

const useTaskModalState = ({
    task,
    setShowUpdateModal,
    updateTask,
    showUpdateModal,
}: UpdateTaskModalProps) => {
    const { id } = task;
    const [{ description, title, state }, setData] = useState(task);
    const setDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
        setData(data => ({ ...data, description: event.target.value }));
    const setTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
        setData(data => ({ ...data, title: event.target.value }));

    const setState = ({
        target: { value },
    }: React.ChangeEvent<HTMLSelectElement>) => {
        setData(data => ({ ...data, state: value as TaskState }));
    };
    const closeModal = () => {
        setData(task);
        setShowUpdateModal(false);
    };
    const updateTaskClicked = () => {
        updateTask({ description, title, state, id });
        closeModal();
    };
    return {
        description,
        title,
        state,
        showUpdateModal,
        setDescription,
        setTitle,
        closeModal,
        setState,
        updateTaskClicked,
    };
};

export function UpdateTaskModal(props: UpdateTaskModalProps) {
    const {
        description,
        title,
        showUpdateModal,
        state,
        setDescription,
        setTitle,
        setState,
        closeModal,
        updateTaskClicked,
    } = useTaskModalState(props);
    return (
        showUpdateModal && (
            <div
                tabIndex={-1}
                aria-hidden="true"
                className={`backdrop-blur-sm flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Update Task
                            </h3>
                            <div>
                                <CloseButton onClick={closeModal} />
                            </div>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <form className="flex-col justify-start">
                                <div className="mb-5 w-1/2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-10">
                                        Title
                                    </label>
                                    <input
                                        onChange={setTitle}
                                        value={title}
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="max-w-sm mb-5 flex-col justify-start">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-2">
                                        Stage
                                    </label>
                                    <select
                                        onChange={setState}
                                        defaultValue={state}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="Backlog">Backlog</option>
                                        <option value="Doing">Doing</option>
                                        <option value="Review">Review</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-10">
                                        Description
                                    </label>
                                    <textarea
                                        onChange={setDescription}
                                        value={description}
                                        rows={4}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <Button
                                label="Update"
                                onClick={updateTaskClicked}
                            />
                            <SecondaryButton
                                label="Cancel"
                                onClick={closeModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
