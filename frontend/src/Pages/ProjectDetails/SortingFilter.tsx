import { useState } from 'react';
import { SortingDirection, TaskSortingField } from './Types';

type SortingFilterProps = {
    setTaskSortByDirection: (direction: SortingDirection) => void;
    setTaskSortByField: (field: TaskSortingField) => void;
};

export function SortingFilter({
    setTaskSortByDirection,
    setTaskSortByField,
}: SortingFilterProps) {
    const [direction, setDirection] = useState(true);
    const handleCheckboxEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskSortByDirection(e.target.checked ? 'asc' : 'desc');
        setDirection(direction => !direction);
    };
    const handleSelectEvent = ({
        target: { value },
    }: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskSortByField(value as TaskSortingField);
    };
    return (
        <div className="flex gap-5 items-center justify-center">
            <label className="inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={handleCheckboxEvent}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {' '}
                    {direction ? 'Ascending' : 'Descending'}{' '}
                </span>
            </label>
            <form className="max-w-sm mx-auto flex-col justify-start">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Sort by
                </label>
                <select
                    onChange={handleSelectEvent}
                    defaultValue={'creation'}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="creation">Creation Date</option>
                    <option value="title">Title</option>
                    <option value="description">Description</option>
                </select>
            </form>
        </div>
    );
}
