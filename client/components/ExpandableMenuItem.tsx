import React, { useState } from 'react';

import styles from './ExpandableMenuItem.module.css';

interface ExpandableMenuItemProps {
  title: string;
  size: string;
}
const ExpandableMenuItem: React.FunctionComponent<ExpandableMenuItemProps> = (
  props
) => {
  const [isExpanded, updateIsExpanded] = useState(false);

  const toggleMenuExpanded = () => {
    updateIsExpanded(!isExpanded);
  };

  const getTitle = () => {
    if (props.size === 'large') {
      return <h5>{props.title}</h5>;
    } else if (props.size === 'small') {
      return <span>{props.title}</span>;
    }
  };

  return (
    <div>
      <div
        className={`${styles.menuInnerContainer} clickable`}
        onClick={toggleMenuExpanded}
      >
        {getTitle()}
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
