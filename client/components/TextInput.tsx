import React from 'react';

import styles from './TextInput.module.css';

interface TextInputProps {
  inputType: string;
  value: string;
  handleChange?: any;
  label?: string;
  isDisabled?: boolean;
  isError?: boolean;
  errorMessage?: string;

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
