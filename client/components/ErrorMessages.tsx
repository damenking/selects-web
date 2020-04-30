import React from 'react';

import styles from './ErrorMessages.module.css';

interface ErrorMessagesProps {
  messages: string[];
  className?: string;
}
const ErrorMessages: React.FunctionComponent<ErrorMessagesProps> = (props) => {
  if (!props.messages.length) {
    return null;
  }
  return (
    <div className={`${styles.container} ${props.className}`}>
      {props.messages.map((message, index) => {
        return <p key={index}>{message}</p>;
      })}
    </div>
  );
};

export default ErrorMessages;
