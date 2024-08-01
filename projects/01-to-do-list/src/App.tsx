import "./global.css";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";
import { v4 as uuidv4 } from "uuid";
import { Task as TaskType } from "./types";

import { Task } from "./components/Task";
import { FormInput } from "./components/FormInput";
import { ChangeEvent, FormEvent, useState } from "react";
import { EmptyTask } from "./components/EmptyTask";

export function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const tasksCount = tasks.length;
  const completedTasksCount = tasks.reduce((count, task) => {
    return task.completed ? count + 1 : count;
  }, 0);

  function handleNewTaskText(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function handleAddNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newTask: TaskType = {
      id: uuidv4(),
      description: form.taskDescription.value,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
  }

  function handleDeleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => task.id !== id);
    setTasks(tasksWithoutDeletedOne);
  }

  function handleCompleteTask(id: string, isChecked: boolean) {
    const tasksUpdated = tasks.map((task) => {
      return task.id !== id ? task : { ...task, completed: isChecked };
    });
    setTasks(tasksUpdated);
  }

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />

      <FormInput
        handleAddNewTask={handleAddNewTask}
        handleNewTaskText={handleNewTaskText}
        newTaskText={newTaskText}
      />

      <main className={styles.taskContainer}>
        <header>
          <div>
            <strong>Tarefas criadas</strong>
            <span>{tasksCount}</span>
          </div>
          <div>
            <strong>Concluídas</strong>
            <span>
              {completedTasksCount} de {tasksCount}
            </span>
          </div>
        </header>

        <section className={styles.taskList}>
          {tasksCount === 0 ? (
            <EmptyTask />
          ) : (
            tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  description={task.description}
                  completed={task.completed}
                  handleDeleteTask={handleDeleteTask}
                  handleCompleteTask={handleCompleteTask}
                />
              );
            })
          )}
        </section>
      </main>
    </div>
  );
}
