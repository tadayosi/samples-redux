import { Page, Button, PageSection, FormGroup, Form, TextInput, ActionGroup } from '@patternfly/react-core';
import * as React from 'react';
import { Task } from './Task';
import TaskList from './TaskList';

const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed'];

export type TasksPageProps = {
  tasks: Task[],
  onCreateTask: (task: Task) => void
}

export type TasksPageState = {
  showNewCardForm: boolean,
  title: string,
  description: string
}

class TasksPage extends React.Component<TasksPageProps, TasksPageState> {
  constructor(props: TasksPageProps) {
    super(props);
    this.state = {
      showNewCardForm: false,
      title: '',
      description: ''
    }
  }

  onTitleChange = (value: string, e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ title: value });
  }

  onDescriptionChange = (value: string, e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ description: value });
  }

  resetForm() {
    this.setState({
      showNewCardForm: false,
      title: '',
      description: ''
    });
  }

  onCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onCreateTask({
      title: this.state.title,
      description: this.state.description
    });
    this.resetForm();
  }

  toggleForm = () => {
    this.setState({ showNewCardForm: !this.state.showNewCardForm });
  }

  renderTaskLists() {
    const { tasks } = this.props;
    return TASK_STATUSES.map(status => {
      const statusTasks = tasks.filter(task => task.status === status);
      return (<TaskList
        key={status}
        status={status}
        tasks={statusTasks}
      />);
    });
  }

  render() {
    return (
      <Page>
        <PageSection>
          <Button variant="secondary" onClick={this.toggleForm}>
            + New task
          </Button>
        </PageSection>
        {this.state.showNewCardForm && (
          <PageSection>
            <Form onSubmit={this.onCreateTask}>
              <FormGroup
                label="Title"
                isRequired
                fieldId="new-task-title"
              >
                <TextInput
                  isRequired
                  type="text"
                  id="new-task-title"
                  placeholder="title"
                  value={this.state.title}
                  onChange={this.onTitleChange}
                />
              </FormGroup>
              <FormGroup
                label="Description"
                isRequired
                fieldId="new-task-description"
              >
                <TextInput
                  isRequired
                  type="text"
                  id="new-task-description"
                  placeholder="description"
                  value={this.state.description}
                  onChange={this.onDescriptionChange}
                />
              </FormGroup>
              <ActionGroup>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </ActionGroup>
            </Form>
          </PageSection>
        )}

        {this.renderTaskLists()}
      </Page>
    );
  }
}

export default TasksPage;
