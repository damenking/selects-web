import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps } from 'airbnb-prop-types';
import moment from 'moment';
import omit from 'lodash/omit';

import { DayPickerRangeController } from 'react-dates';

import ScrollableOrientationShape from './shapes/ScrollableOrientationShape.js';

import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION } from './constants.js';

import isInclusivelyAfterDay from './utils/isInclusivelyAfterDay.js';

const propTypes = forbidExtraProps({
  // example props for the demo
  autoFocusEndDate: PropTypes.bool,
  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj,
  startDateOffset: PropTypes.func,
  endDateOffset: PropTypes.func,
  showInputs: PropTypes.bool,
  minDate: momentPropTypes.momentObj,
  maxDate: momentPropTypes.momentObj,

  keepOpenOnDateSelect: PropTypes.bool,
  minimumNights: PropTypes.number,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,
  daysViolatingMinNightsCanBeClicked: PropTypes.bool,

  // DayPicker props
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  verticalHeight: PropTypes.number,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  renderCalendarInfo: PropTypes.func,
  renderMonthElement: PropTypes.func,
  renderMonthText: PropTypes.func,

  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  renderNavPrevButton: PropTypes.func,
  renderNavNextButton: PropTypes.func,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  renderKeyboardShortcutsButton: PropTypes.func,
  renderKeyboardShortcutsPanel: PropTypes.func,

  // i18n
  monthFormat: PropTypes.string,

  isRTL: PropTypes.bool,

  // Custom
  handleOnDateChange: PropTypes.func,
  lastAvailableEndDate: PropTypes.string,
});

const defaultProps = {
  // example props for the demo
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,
  startDateOffset: undefined,
  endDateOffset: undefined,
  showInputs: false,
  minDate: null,
  maxDate: null,

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  minimumNights: 0,
  isDayBlocked: () => false,
  isOutsideRange: (day) => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,
  enableOutsideDays: false,
  daysViolatingMinNightsCanBeClicked: false,

  // calendar presentation and interaction related props
  orientation: HORIZONTAL_ORIENTATION,
  verticalHeight: undefined,
  withPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  onOutsideClick() {},
  keepOpenOnDateSelect: false,
  renderCalendarInfo: null,
  isRTL: false,
  renderMonthText: null,
  renderMonthElement: null,
  renderKeyboardShortcutsButton: undefined,
  renderKeyboardShortcutsPanel: undefined,

  // navigation related props
  navPrev: null,
  navNext: null,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // internationalization
  monthFormat: 'MMMM YYYY',
};

class DayPickerRangeControllerWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
      focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    if (
      endDate &&
      this.props.lastAvailableEndDate &&
      endDate.isAfter(moment(this.props.lastAvailableEndDate))
    ) {
      this.setState({
        startDate: endDate,
        endDate: null,
      });
      this.props.handleOnDateChange(endDate, null);
    } else {
      this.setState({
        startDate,
        endDate: endDate,
      });
      this.props.handleOnDateChange(startDate, endDate);
    }
  }

  onFocusChange(focusedInput) {
    // May want to have a check for start date and end date to determine focus
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      // focusedInput: !focusedInput ? START_DATE : focusedInput,
      focusedInput: END_DATE,
    });
  }

  render() {
    const {
      renderCalendarInfo: renderCalendarInfoProp,
      showInputs,
    } = this.props;
    const { errorMessage, focusedInput, startDate, endDate } = this.state;

    const props = omit(this.props, [
      'autoFocus',
      'autoFocusEndDate',
      'initialStartDate',
      'initialEndDate',
      'showInputs',
      'handleOnDateChange',
      'lastAvailableEndDate',
    ]);

    const startDateString = startDate && startDate.format('YYYY-MM-DD');
    const endDateString = endDate && endDate.format('YYYY-MM-DD');
    const renderCalendarInfo = errorMessage
      ? () => <div>{errorMessage}</div>
      : renderCalendarInfoProp;

    return (
      <div style={{ height: '100%' }}>
        {showInputs && (
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              name="start date"
              value={startDateString}
              readOnly
            />
            <input type="text" name="end date" value={endDateString} readOnly />
          </div>
        )}

        <DayPickerRangeController
          {...props}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          renderCalendarInfo={renderCalendarInfo}
        />
      </div>
    );
  }
}

DayPickerRangeControllerWrapper.propTypes = propTypes;
DayPickerRangeControllerWrapper.defaultProps = defaultProps;

export default DayPickerRangeControllerWrapper;
