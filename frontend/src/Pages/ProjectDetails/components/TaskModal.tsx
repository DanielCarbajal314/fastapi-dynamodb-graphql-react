import { useState } from 'react';
import { Button, CloseButton, SecondaryButton } from '../../../Components';

type TaskModalProps = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    createTask: (request: { description: string; title: string }) => void;
};

const initialState = {
    description: '',
    title: '',
};

const useTaskModalState = ({
    createTask,
    showModal,
    setShowModal,
}: TaskModalProps) => {
    const [{ description, title }, setState] = useState(initialState);
    const setDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
        setState(state => ({ ...state, description: event.target.value }));
    const setTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
        setState(state => ({ ...state, title: event.target.value }));
    const closeModal = () => setShowModal(false);
    const registerTask = () => {
        createTask({ description, title });
        closeModal();
        setState(initialState);
    };
    return {
        description,
        title,
        setDescription,
        setTitle,
        closeModal,
        showModal,
        registerTask,
    };
};

export function TaskModal(props: TaskModalProps) {
    const {
        description,
        title,
        setDescription,
        setTitle,
        closeModal,
        showModal,
        registerTask,
    } = useTaskModalState(props);
    return (
        <div
            tabIndex={-1}
            aria-hidden="true"
            className={`${showModal ? '' : 'hidden '} backdrop-blur-sm flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Create Task
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
                        <Button label="Create" onClick={registerTask} />
                        <SecondaryButton label="Cancel" onClick={closeModal} />
                    </div>
                </div>
            </div>
        </div>
    );
}
