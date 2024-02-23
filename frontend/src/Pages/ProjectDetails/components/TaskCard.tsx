import { CloseButton } from '../../../Components';

type TaskCardProps = {
    id: string;
    title: string;
    description: string;
    timestamp: number;
    deleteTask: (id: string) => void;
};

export function TaskCard({
    id,
    title,
    description,
    timestamp,
    deleteTask,
}: TaskCardProps) {
    return (
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
                <CloseButton onClick={() => deleteTask(id)} />
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
