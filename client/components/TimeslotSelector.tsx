import React, { useState } from 'react';
import * as moment from 'moment';
import DayPickerRangeControllerWrapper from './Datepickers/DayPickerRangeControllerWrapper.jsx';
import { useWindowDimensions } from './WindowDimensionsProvider';

import styles from './TimeslotSelector.module.css';

const TimeslotSelector: React.FunctionComponent<any> = (props) => {
  const [lastAvailableEndDate, updatelastAvailableEndDate] = useState('');
  const screenWidth = useWindowDimensions().width;
  const numMonths = screenWidth >= 2000 ? 2 : 1;

  const isOutsideRange = (day: moment.Moment) => {
    const dateString = day.hour(0).toDate().toString();
    return !props.availableDates[dateString];
  };

  const handleOnDateChange = (
    startDate: moment.Moment
    // endDate: moment.Moment | undefined
  ) => {
    getAvailableEndDates(startDate.toDate());
  };

  const getAvailableEndDates = (startDateObj: Date) => {
    let checkingDates = true;
    let dateToCheck = startDateObj.toString();
    const availableEndDates: any = {};
    let lastDate = '';
    while (checkingDates) {
      if (props.availableDates[dateToCheck]) {
        availableEndDates[dateToCheck] = props.availableDates[dateToCheck];
        lastDate = dateToCheck;
      } else {
        checkingDates = false;
        break;
      }
      const dateToCheckObj = new Date(dateToCheck);
      dateToCheck = new Date(
        dateToCheckObj.setDate(dateToCheckObj.getDate() + 1)
      ).toString();
    }
    updatelastAvailableEndDate(lastDate);
  };

  return (
    <div className={styles.container}>
      <div>
        <small className={`${styles.datePickerLabel} color-ink-plus-1`}>
          Check-out
        </small>
      </div>
      <DayPickerRangeControllerWrapper
        numberOfMonths={numMonths}
        handleOnDateChange={handleOnDateChange}
        isOutsideRange={isOutsideRange}
        lastAvailableEndDate={lastAvailableEndDate}
      />
    </div>
  );
};

export default TimeslotSelector;
