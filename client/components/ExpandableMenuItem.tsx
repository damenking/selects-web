import React, { useState } from 'react';

import styles from './ExpandableMenuItem.module.css';

interface ExpandableMenuItemProps {
  title: string;
  // contentHeight: string;
}
const ExpandableMenuItem: React.FunctionComponent<ExpandableMenuItemProps> = (
  props
) => {
  const [isExpanded, updateIsExpanded] = useState(false);

  const toggleMenuExpanded = () => {
    updateIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        className={`${styles.menuInnerContainer} clickable`}
        onClick={toggleMenuExpanded}
      >
        <h5>{props.title}</h5>
        {isExpanded && <img src="/static/icons/chevronUp.svg" />}
        {!isExpanded && <img src="/static/icons/chevronDown.svg" />}
      </div>

      <div
        className={`${
          isExpanded
            ? styles.contentContainerExpanded
            : styles.contentContainerHidden
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default ExpandableMenuItem;
