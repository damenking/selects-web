import React from 'react';

import styles from './SecondaryButton.module.css';

interface SecondaryButtonProps {
  isDisabled?: boolean;
  handleClick: any;
  text: string;
  icon?: string;
  tooltipText?: string;
}
const SecondaryButton: React.FunctionComponent<SecondaryButtonProps> = (
  props
) => {
  return (
    <div
      onClick={props.isDisabled ? null : props.handleClick}
      className={`${styles.container} ${
        props.isDisabled ? styles.disabled : ''
      } 
      ${props.isDisabled ? '' : 'clickable'}`}
      title={props.tooltipText ? props.tooltipText : ''}
    >
      <div className={styles.iconContainer}>
        {props.icon && <img src={props.icon} />}
      </div>
      <span className={styles.textContainer}>{props.text}</span>
    </div>
  );
};

export default SecondaryButton;
