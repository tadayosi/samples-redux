import { Expandable } from '@patternfly/react-core';
import * as React from 'react';

export type Task = {
  id: number,
  title: string,
  description: string,
  status: string
};

export type TaskProps = {
  task: Task
}

const TaskF: React.SFC<TaskProps> = props => {
  return (
    <React.Fragment>
      <Expandable toggleText={props.task.title}>
        {props.task.description}
      </Expandable>
    </React.Fragment >
  );
}

export default TaskF;
