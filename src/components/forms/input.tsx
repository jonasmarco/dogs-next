import { ComponentProps } from 'react';

import styles from './input.module.css';

type InputProps = ComponentProps<'input'> & {
  label: string;
};

export default function Input({label, ...props}: InputProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={props.name}>
        {label}
      </label>
      <input className={styles.input} id={props.name} {...props} />
    </div>
  );
}
