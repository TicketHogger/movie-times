import { shallow, mount, render } from 'enzyme';
import React from 'react';
import App from '../client/src/App.jsx';
import fetch from 'isomorphic-fetch';
import Calendar from '../client/src/Calendar.jsx';
import getDays from '../daysinamonth.js';

test('getDays function should have 365 dates', () => {
    let days = new getDays();
    days.fillDays(2018);
    expect(days.yearDates).toHaveLength(365);
})

test('App Component should have a title', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('h1').length).toBe(1);
})

test('Calendar Component should be within App Component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Calendar).length).toBe(1);
})

test('Calendar Component should contain state for fetched data', () => {
    const wrapper = mount(<Calendar />);
    let days = new getDays();
    days.fillDays(2018);
    wrapper.setState({date: '10-24-2018', dates: days.yearDates, dateIndex: days.yearIndexes});
    
})