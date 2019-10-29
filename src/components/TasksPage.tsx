import { Page } from '@patternfly/react-core';
import * as React from 'react';
import { Task } from './Task';
import TaskList from './TaskList';

const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed'];

export type TasksPageProps = {
  tasks: Task[]
}

class TasksPage extends React.Component<TasksPageProps> {
  renderTaskLists() {
    const { tasks } = this.props;
    return TASK_STATUSES.map(status => {
      const statusTasks = tasks.filter(task => task.status === status);
      console.log(statusTasks);
      return <TaskList key={status} status={status} tasks={statusTasks} />;
    });
  }

  render() {
    return (
      <Page>
        {this.renderTaskLists()}
      </Page>
    );
  }
}

export default TasksPage;
