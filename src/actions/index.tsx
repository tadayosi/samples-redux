import { Task } from "../components/Task";

let _id = 1;
export function uniqueId() {
  return _id++;
}

export function createTask({ title, description }: Task) {
  return {
    type: 'CREATE_TASK',
    payload: {
      id: uniqueId(),
      title,
      description,
      status: 'Unstarted'
    }
  }
}
