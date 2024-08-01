import { useState } from "react";
import styles from "./Task.module.css";
import { Trash } from "phosphor-react";

interface TaskProps {
  id: string;
  description: string;
  completed: boolean;
  handleDeleteTask: (id: string) => void;
  handleCompleteTask: (id: string, completed: boolean) => void;
}

export function Task(props: TaskProps) {
  const [completed, setCompleted] = useState<boolean>(props.completed);

  function handleToggleCompleted() {
    setCompleted(!completed);
    props.handleCompleteTask(props.id, !completed);
  }

  return (
    <div className={`${styles.task} ${completed ? styles.taskCompleted : ""}`}>
      <input
        onChange={handleToggleCompleted}
        checked={completed}
        name="checkbox"
        className={styles.checkbox}
        type="checkbox"
      />
      <p
        className={
          props.completed ? styles.paragraphCompleted : styles.paragraphPending
        }
      >
        {props.description}
      </p>
      <button onClick={() => props.handleDeleteTask(props.id)}>
        <Trash />
      </button>
    </div>
  );
}
