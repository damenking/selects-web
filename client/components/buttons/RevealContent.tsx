import React, { useState } from 'react';

import styles from './RevealContent.module.css';

const RevealContent: React.FunctionComponent = ({ children }) => {
  const [contentRevealed, updateContentRevealed] = useState(false);

  return (
    <>
      <div
        className={`${
          contentRevealed
            ? styles.buttonContainerHidden
            : styles.buttonContainerExpanded
        } clickable`}
        onClick={() => updateContentRevealed(true)}
      >
        <img src="/static/icons/plus.svg" />
        <span className={styles.readMoreText}>Read more</span>
      </div>
      <div
        className={`${
          !contentRevealed
            ? styles.contentContainerHidden
            : styles.contentContainerExpanded
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default RevealContent;
