import styles from "./EmptyTask.module.css";
import clipboard from "../assets/clipboard.svg";

export function EmptyTask() {
  return (
    <div className={styles.empty}>
      <img src={clipboard} alt="Imagem de uma prancheta" />
      <div>
        <p>
          <strong>Você ainda não tem tarefas cadastradas</strong>
        </p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </div>
  );
}
