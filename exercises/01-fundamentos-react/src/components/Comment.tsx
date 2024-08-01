import styles from "./Comment.module.css";
import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ThumbsUp, Trash } from "phosphor-react";

import { Avatar } from "./Avatar";
import { users } from "../data/users";

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [applauseCount, setApplauseCount] = useState(0);

  const publishedAt = new Date();

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleApplause() {
    setApplauseCount((applauses) => applauses + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src={users.default.avatarUrl} alt={""} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Usuário</strong>
              <time
                title={publishedDateFormatted}
                dateTime={publishedAt.toISOString()}
              >
                {publishedDateRelativeToNow}
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleApplause}>
            <ThumbsUp /> Aplaudir <span>{applauseCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
