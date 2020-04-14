import React from 'react';
import DayPickerRangeControllerWrapper from './Datepickers/DayPickerRangeControllerWrapper.jsx';
import { useWindowDimensions } from './WindowDimensionsProvider';

import styles from './TimeslotSelector.module.css';

const TimeslotSelector: React.FunctionComponent = () => {
  const screenWidth = useWindowDimensions().width;
  const numMonths = screenWidth >= 2000 ? 2 : 1;
  return (
    <div className={styles.container}>
      <div>
        <small className={`${styles.datePickerLabel} color-ink-plus-1`}>
          Check-out
        </small>
      </div>
      <DayPickerRangeControllerWrapper numberOfMonths={numMonths} />
    </div>
  );
};

export default TimeslotSelector;
