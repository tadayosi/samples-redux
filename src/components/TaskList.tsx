import { PageSection, Title } from '@patternfly/react-core';
import React from 'react';
import TaskF, { Task } from './Task';

export type TaskListProps = {
  status: string;
  tasks: Task[];
}

const TaskList: React.SFC<TaskListProps> = props => {
  return (
    <PageSection>
      <Title size="2xl">{props.status}</Title>
      {props.tasks.map(task =>
        <TaskF key={task.id} task={task} />
      )}
    </PageSection>
  );
}

export default TaskList;
