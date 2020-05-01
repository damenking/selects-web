import React, { useState } from 'react';

import styles from './RevealContent.module.css';

interface RevealContentProps {
  text: string;
  handleClick?: any;
  icon?: string;
  textClass?: string;
  contentClass?: string;
}
const RevealContent: React.FunctionComponent<RevealContentProps> = (props) => {
  const [contentRevealed, updateContentRevealed] = useState(false);

  const handleClick = () => {
    updateContentRevealed(true);
    if (props.handleClick) {
      props.handleClick();
    }
  };
  return (
    <>
      <div
        className={`${
          contentRevealed
            ? styles.buttonContainerHidden
            : styles.buttonContainerExpanded
        } clickable`}
        onClick={handleClick}
      >
        {props.icon && <img className={styles.icon} src={props.icon} />}
        <span className={`${props.textClass} font-family-apercu-medium`}>
          {props.text}
        </span>
      </div>
      <div
        className={`${props.contentClass} ${
          !contentRevealed
            ? styles.contentContainerHidden
            : styles.contentContainerExpanded
        }`}
      >
        {props.children}
      </div>
    </>
  );
};

export default RevealContent;
