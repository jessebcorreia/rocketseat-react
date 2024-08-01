import styles from "./FormInput.module.css";
import { FormEvent, ChangeEvent } from "react";
import { PlusCircle } from "phosphor-react";

interface FormInputProps {
  handleAddNewTask: (event: FormEvent<HTMLFormElement>) => void;
  handleNewTaskText: (event: ChangeEvent<HTMLInputElement>) => void;
  newTaskText: string;
}

export function FormInput(props: FormInputProps) {
  return (
    <form onSubmit={props.handleAddNewTask} className={styles.inputWrapper}>
      <input
        onChange={props.handleNewTaskText}
        value={props.newTaskText}
        name="taskDescription"
        placeholder="Adicione uma nova tarefa"
        type="text"
        required
      />

      <button type="submit">
        Criar
        <PlusCircle />
      </button>
    </form>
  );
}
