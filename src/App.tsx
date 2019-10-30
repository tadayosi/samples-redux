import * as React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Task } from './components/Task';
import TasksPage from './components/TasksPage';
import { createTask } from './actions';

type AppProps = {
  tasks: Task[],
  dispatch: (s: any) => void
}

class App extends React.Component<AppProps> {
  onCreateTask = ({ title, description }: Task) => {
    this.props.dispatch(createTask({ title, description }));
  };

  public render() {
    console.log('props from App:', this.props);
    return (
      <React.Fragment>
        <TasksPage
          tasks={this.props.tasks}
          onCreateTask={this.onCreateTask}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: { tasks: Task[] }) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(App);
