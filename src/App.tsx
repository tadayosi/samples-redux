import * as React from 'react';
import './App.css';
import { Task } from './components/Task';
import TasksPage from './components/TasksPage';
import { connect } from 'react-redux';

type AppProps = {
  tasks: Task[]
}

class App extends React.Component<AppProps> {
  public render() {
    return (
      <React.Fragment>
        <TasksPage tasks={this.props.tasks} />
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
