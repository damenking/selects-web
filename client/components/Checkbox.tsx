import React from 'react';

import styles from './Checkbox.module.css';

interface CheckboxProps {
  isDisabled?: boolean;
  isChecked: boolean;
  handleChange: any;
  label?: string;
  className?: string;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = (props) => {
  return (
    <div className={`${styles.checkboxContainer} ${props.className}`}>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          onChange={(e) => props.handleChange(e)}
          checked={props.isChecked}
        />
        <span></span>
      </label>
      {props.label && <label className={styles.realLabel}>{props.label}</label>}
    </div>
  );
};

export default Checkbox;
