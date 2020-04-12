// @ts-nocheck
import React, { useEffect, useState } from 'react';
import JSdatepicker from 'js-datepicker';

import styles from './DatePicker.module.css';

const DatePicker = (props) => {
  const [pickerAttached, updatePickerAttached] = useState(false);
  const {
    handleStartDateSelect,
    availableDates,
    pickerElId,
    disabled,
    pickerPairId,
  } = props;

  useEffect(() => {
    const lazyDatePicker = async () => {
      // Avoids window is not defined error on server
      const datepicker = (await import('js-datepicker')).default(
        document.getElementById(pickerElId),
        {
          id: pickerPairId,
          disabler: (date) => {
            // results in 0 if in the availability object but time slot count is 0
            // or undefined if missing from availability object
            return !availableDates[date];
          },
          onSelect: (datePickerInstance, dateObj) => {
            handleStartDateSelect(dateObj);
          },
          formatter: (input, date, instance) => {
            const value = date.toLocaleDateString();
            input.value = value; // => '1/1/2099'
          },
        }
      );
    };
    if (!pickerAttached && Object.keys(availableDates).length) {
      updatePickerAttached(true);
      lazyDatePicker();
    }
  });

  return (
    <input
      id={pickerElId}
      className={styles.input + ' ' + (disabled ? styles.inputDisabled : '')}
      type="text"
      placeholder="Choose a date"
      disabled={disabled || !pickerAttached}
      readOnly
    />
  );
};

export default DatePicker;
