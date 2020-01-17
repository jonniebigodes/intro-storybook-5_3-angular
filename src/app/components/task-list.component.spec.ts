// src/app/components/task-list.component.spec.ts

import { render } from '@testing-library/angular';
import { PureTaskListComponent } from './pure-task-list.component';
import { TaskComponent } from './task.component';
import { withPinnedTasksData } from './pure-task-list.stories.ts';
describe('TaskList component', () => {
  it('renders pinned tasks at the start of the list', async () => {
    const mockedActions = jest.fn();
    const tree = await render(PureTaskListComponent, {
      declarations: [TaskComponent],
      componentProperties: {
        tasks: withPinnedTasksData,
        loading: false,
        onPinTask: {
          emit: mockedActions
        } as any,
        onArchiveTask: {
          emit: mockedActions
        } as any
      }
    });
    const component = tree.fixture.componentInstance;
    expect(component.tasksInOrder[0].id).toBe('6');
  });
});
