import { format, formatDistanceToNow } from "date-fns" 
import ptBR from "date-fns/locale/pt-BR"

import { Comment } from "./Comment"
import { Avatar } from "./Avatar"


import styles from "./Post.module.css"
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"

export interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

export interface Content {
    type: "paragraph" | "link";
    content: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export function Post({ author, publishedAt, content } : PostProps) {
    
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    const [comments, setComments] = useState([
        "Post muito banaca, hein?!"
    ])
    
    const [newCommentText, setNewCommentText] = useState("")

    const isNewCommentEmpty = newCommentText.length === 0;

    function handleCreateNewComment(event : FormEvent) {
        event.preventDefault()

        setComments([...comments, newCommentText])
        setNewCommentText("")
    }

    function handleNewCommentChange(event : ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("")
        setNewCommentText(event.target.value)
    }

    function deleteComment(commentToDelete : string) {
        console.log(commentToDelete);
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })

        setComments(commentsWithoutDeletedOne)
    }

    function handleNewCommentInvalid(event : InvalidEvent<HTMLTextAreaElement>) 
    {
        event.target.setCustomValidity("Esse campo é obrigatório.")
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>
            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === "paragraph") {
                        return <p key={line.content} >{line.content}</p>
                    } else if (line.type === "link") {
                        return <p key={line.content} ><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    name="comment"
                    placeholder="Deixe um comentário"
                    onChange={handleNewCommentChange}
                    value={newCommentText}
                    required
                    onInvalid={handleNewCommentInvalid}
                />
                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment onDeleteComment={deleteComment} key={comment} content={comment} />
                })}
            </div>
        </article>
    )
}