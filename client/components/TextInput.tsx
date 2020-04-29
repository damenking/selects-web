import React from 'react';

import styles from './TextInput.module.css';

interface TextInputProps {
  isDisabled?: boolean;
  handleChange?: any;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  inputType: string;
  value: string;
  pattern?: string;
}

const TextInput: React.FunctionComponent<TextInputProps> = (props) => {
  return (
    <div>
      {props.label && (
        <div>
          <small className="color-ink-plus-1">{props.label}</small>
        </div>
      )}
      <input
        className={styles.inputField}
        type={props.inputType}
        onChange={props.handleChange}
        value={props.value}
        pattern={props.pattern}
      />
    </div>
  );
};

export default TextInput;
