// @ts-nocheck
import React, { useEffect, useState } from 'react';

const DatePicker = props => {
  const [pickerAttached, updatePickerAttached] = useState(false);
  const { handleStartDateSelect, availableDates } = props;

  useEffect(() => {
    const lazyDatePicker = async () => {
      // Avoids window is not defined error on server
      const datepicker = (await import('js-datepicker')).default(
        document.getElementById('product-datepicker'),
        {
          disabler: date => {
            return !availableDates[date];
          },
          onSelect: (datePickerInstance, dateObj) => {
            handleStartDateSelect(dateObj);
          }
        }
      );
    };
    if (!pickerAttached && Object.keys(props.availableDates).length) {
      updatePickerAttached(true);
      lazyDatePicker();
    }
  });

  return <input id="product-datepicker" type="text" />;
};

export default DatePicker;
