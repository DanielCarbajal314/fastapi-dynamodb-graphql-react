import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTaskSortingState } from '../../hooks/useTaskSortingState';
import { Task, TaskState } from '../../Types';

const generateTimeStamp = (year: number, month: number, day: number) =>
    new Date(year, month, day).getTime();

const tasks: Task[] = [
    {
        id: '1',
        title: '2011',
        description: 'A',
        state: 'Backlog',
        timestamp: generateTimeStamp(2011, 1, 1),
    },
    {
        id: '2',
        title: '2012',
        description: 'B',
        state: 'Backlog',
        timestamp: generateTimeStamp(2012, 1, 1),
    },
    {
        id: '3',
        title: '2013',
        description: 'C',
        state: 'Backlog',
        timestamp: generateTimeStamp(2013, 1, 1),
    },
    {
        id: '4',
        title: '2014',
        description: 'D',
        state: 'Backlog',
        timestamp: generateTimeStamp(2014, 1, 1),
    },
];

const ascendantOrder = ['2011', '2012', '2013', '2014'];
const decendantOrder = ['2014', '2013', '2012', '2011'];

describe('Testing custom task sorting hook', () => {
    it('Testing Default Sorting', () => {
        const {
            result: { current },
        } = renderHook(useTaskSortingState);
        const { currentSortingLabel, buildTaskGroups } = current;
        const sortedTask = buildTaskGroups(tasks);
        expect(currentSortingLabel).equal('Sorting by creation time ascending');
        expect(sortedTask[0].tasks.map(x => x.title)).to.eql(ascendantOrder);
    });

    it('Testing chaging sort direction to desc', () => {
        const { result, rerender } = renderHook(useTaskSortingState);
        const { setTaskSortByDirection } = result.current;
        setTaskSortByDirection('desc');
        rerender();
        const { buildTaskGroups, currentSortingLabel } = result.current;
        expect(currentSortingLabel).equal(
            'Sorting by creation time descending',
        );
        const sortedTask = buildTaskGroups(tasks);
        expect(sortedTask[0].tasks.map(x => x.title)).to.eql(decendantOrder);
    });

    it('Testing chaging sorting in multiple groups', () => {
        const { result, rerender } = renderHook(useTaskSortingState);
        const { setTaskSortByDirection } = result.current;
        setTaskSortByDirection('desc');
        rerender();
        const { buildTaskGroups, currentSortingLabel } = result.current;
        expect(currentSortingLabel).equal(
            'Sorting by creation time descending',
        );
        const taskInDoing = tasks.map(x => ({
            ...x,
            state: 'Doing' as TaskState,
        }));
        const taskInReview = tasks.map(x => ({
            ...x,
            state: 'Review' as TaskState,
        }));
        const taskInDone = tasks.map(x => ({
            ...x,
            state: 'Done' as TaskState,
        }));
        const sortedTask = buildTaskGroups([
            ...tasks,
            ...taskInDoing,
            ...taskInReview,
            ...taskInDone,
        ]);
        expect(sortedTask[0].tasks.map(x => x.title)).to.eql(decendantOrder);
        expect(sortedTask[1].tasks.map(x => x.title)).to.eql(decendantOrder);
        expect(sortedTask[2].tasks.map(x => x.title)).to.eql(decendantOrder);
        expect(sortedTask[3].tasks.map(x => x.title)).to.eql(decendantOrder);
    });

    it('Testing chaging to sort by title', () => {
        const { result, rerender } = renderHook(useTaskSortingState);
        const { setTaskSortByField } = result.current;
        setTaskSortByField('title');
        rerender();
        const { buildTaskGroups, currentSortingLabel } = result.current;
        expect(currentSortingLabel).equal('Sorting by title ascending');
        const sortedTask = buildTaskGroups(tasks);
        expect(sortedTask[0].tasks.map(x => x.title)).to.eql(ascendantOrder);
    });

    it('Testing chaging to sort by title desc', () => {
        const { result, rerender } = renderHook(useTaskSortingState);
        const { setTaskSortByField, setTaskSortByDirection } = result.current;
        setTaskSortByField('title');
        setTaskSortByDirection('desc');
        rerender();
        const { buildTaskGroups, currentSortingLabel } = result.current;
        expect(currentSortingLabel).equal('Sorting by title descending');
        const sortedTask = buildTaskGroups(tasks);
        expect(sortedTask[0].tasks.map(x => x.title)).to.eql(decendantOrder);
    });

    it('Testing chaging to description by title', () => {
        const { result, rerender } = renderHook(useTaskSortingState);
        const { setTaskSortByField } = result.current;
        setTaskSortByField('description');
        rerender();
        const { buildTaskGroups, currentSortingLabel } = result.current;
        expect(currentSortingLabel).equal('Sorting by description ascending');
        const sortedTask = buildTaskGroups(tasks);
        expect(sortedTask[0].tasks.map(x => x.title)).to.eql(ascendantOrder);
    });

    it('Testing chaging to sort by description desc and back to asc', () => {
        const { result, rerender } = renderHook(useTaskSortingState);
        const { setTaskSortByField, setTaskSortByDirection } = result.current;
        setTaskSortByField('description');
        setTaskSortByDirection('desc');
        rerender();
        const {
            buildTaskGroups: buildTaskGroupsDesc,
            currentSortingLabel: currentSortingLabelDesc,
        } = result.current;
        expect(currentSortingLabelDesc).equal(
            'Sorting by description descending',
        );
        const sortedTaskDesc = buildTaskGroupsDesc(tasks);
        expect(sortedTaskDesc[0].tasks.map(x => x.title)).to.eql(
            decendantOrder,
        );
        setTaskSortByDirection('asc');
        rerender();
        const {
            buildTaskGroups: buildTaskGroupsAsc,
            currentSortingLabel: currentSortingLabelAsc,
        } = result.current;
        expect(currentSortingLabelAsc).equal(
            'Sorting by description ascending',
        );
        const sortedTaskAsc = buildTaskGroupsAsc(tasks);
        expect(sortedTaskAsc[0].tasks.map(x => x.title)).to.eql(ascendantOrder);
    });
});
