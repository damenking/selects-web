import React from 'react';

import styles from './PrimaryButton.module.css';

interface PrimaryButtonProps {
  isDisabled?: boolean;
  handleClick: any;
  text: string;
  icon?: string;
  tooltipText?: string;
}

const PrimaryButton: React.FunctionComponent<PrimaryButtonProps> = (props) => {
  return (
    <div
      className={`${styles.container} ${
        props.isDisabled ? styles.disabled : ''
      } 
      ${props.isDisabled ? '' : 'clickable'}
      background-color-orange`}
      onClick={props.isDisabled ? '' : props.handleClick}
      title={props.tooltipText ? props.tooltipText : ''}
    >
      <div className={styles.iconContainer}>
        {props.icon && <img src={props.icon} />}
      </div>
      <span className={`${styles.textContainer} underlined`}>{props.text}</span>
    </div>
  );
};

export default PrimaryButton;
