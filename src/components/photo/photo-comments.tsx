'use-client';

import PhotoCommentsForm from '@/components/photo/photo-comments-form';
import { useUser } from '@/context/user-context';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './photos-comments.module.css';

export interface PhotoCommentsProps {
  id: string;
  single: boolean;
  comments: Comment[];
}

const PhotoComments = (props: PhotoCommentsProps) => {
  const {user} = useUser();

  const [comments, setComments] = useState(() => props.comments);
  const commentsSection = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (commentsSection.current)
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${props.single ? styles.single : ''}`}>
        {comments.map(comment => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>

      {user && (
        <PhotoCommentsForm
          id={props.id}
          single={props.single}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default PhotoComments;
