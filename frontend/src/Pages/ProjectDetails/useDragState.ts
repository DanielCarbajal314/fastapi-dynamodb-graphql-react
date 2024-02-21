import { useState } from 'react';

export const useDragState = () => {
    const [activeStates, setActiveStates] = useState<string[]>([]);
    const [draggedTaskId, setDraggedTaskId] = useState<string>('');
    const clearActiveState = () => setActiveStates([]);
    const isDragingOver = (state: string) => activeStates.includes(state);
    const enteringDragArea = (newState: string) => () =>
        setActiveStates(state => [
            ...state.filter(x => x === newState),
            newState,
        ]);
    const leavingingDragArea = (oldState: string) => () =>
        setActiveStates(state => state.filter(x => x !== oldState));
    return {
        isDragingOver,
        enteringDragArea,
        leavingingDragArea,
        draggedTaskId,
        setDraggedTaskId,
        clearActiveState,
    };
};
