import * as React from 'react';
import './App.css';
import { Task } from './components/Task';
import TasksPage from './components/TasksPage';

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Learn Redux',
    description: 'The store, actions, and reducers, oh my!',
    status: 'In Progress'
  },
  {
    id: 2,
    title: 'Peace on Earth',
    description: 'No big deal.',
    status: 'In Progress'
  }
];

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <TasksPage tasks={mockTasks} />
      </React.Fragment>
    );
  }
}

export default App;
