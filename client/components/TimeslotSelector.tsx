import React, { useState } from 'react';
import DatePicker from './DatePicker';

import styles from './TimeslotSelector.module.css';

const TimeslotSelector: React.FunctionComponent<any> = (props) => {
  const [availableEndDatesObj, updateAvailableEndDatesObj] = useState({});
  const [disableEndSelect, updateDisableEndSelect] = useState(true);

  const handleStartDateSelect = (startDateObj: Date) => {
    props.handleStartDateSelect(startDateObj);
    getAvailableEndDates(startDateObj);
    updateDisableEndSelect(false);
  };

  const getAvailableEndDates = (startDateObj: Date) => {
    let checkingDates = true;
    let dateToCheck = startDateObj.toString();
    const availableEndDates: any = {};
    while (checkingDates) {
      if (props.availableDates[dateToCheck]) {
        availableEndDates[dateToCheck] = props.availableDates[dateToCheck];
      } else {
        checkingDates = false;
        break;
      }
      const dateToCheckObj = new Date(dateToCheck);
      dateToCheck = new Date(
        dateToCheckObj.setDate(dateToCheckObj.getDate() + 1)
      ).toString();
    }
    updateAvailableEndDatesObj(availableEndDates);
  };

  return (
    <div className={styles.container}>
      <div>
        <small className={`${styles.datePickerLabel} color-ink-plus-1`}>
          Check-out
        </small>
      </div>
      <DatePicker
        availableDates={props.availableDates}
        handleStartDateSelect={handleStartDateSelect}
        pickerElId="picker-start"
        pickerPairId={1}
      />
      <div className={styles.returnLabel}>
        <small className={`${styles.datePickerLabel} color-ink-plus-1`}>
          Return
        </small>
      </div>
      <DatePicker
        availableDates={availableEndDatesObj}
        handleStartDateSelect={props.handleStartDateSelect}
        pickerElId="picker-end"
        pickerPairId={1}
        disabled={disableEndSelect}
      />
    </div>
  );
};

export default TimeslotSelector;
