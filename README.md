# React Native Jalaali (Persian) DatePicker
[![NPM Version](https://img.shields.io/npm/v/react-native-jalaali-date-picker.svg?style=flat)](https://www.npmjs.com/package/react-native-jalaali-date-picker)
<!-- [![Build Status](https://travis-ci.org/rghorbani/react-native-persian-calendar-picker.svg?branch=master)](https://travis-ci.org/rghorbani/react-native-persian-calendar-picker) -->


This is a Jalaali (Persian) Date Picker Component for React Native


<kbd>
<img src="https://github.com/Amirnajafi/react-native-persian-date-picker/blob/master/demo/demo.jpg?raw=true">
</kbd>

The package is both **Android** and **iOS** compatible.

## Installation
`$ npm install --save react-native-jalaali-date-picker`
or 

`$ yarn add react-native-jalaali-date-picker`
# Prerequisites

DatePicker requires Moment JS.  Date props may be anything parseable by Moment: Javascript Date, Moment date, or ISO8601 datetime string.

## Usage

How to use it:
``` 
import React, {Component} from 'react';
import DatePicker from 'react-native-jalaali-date-picker'

export default class App extends Component {
    render() {
        return (
            <DatePicker
                showTitleDate={true}
                onChangeDate={(date)=>{
                console.log(date)
            }}
            />
        );
    }
}
```

## PersianCalendarPicker props
| Prop | Type | Description |
:------------ |:---------------| :-----|
| **`defDate`** | `Moment date` | Optional. Open date picker with custome date. Default is `today` |
| **`defDateString`** | `Strings` | Optional. Open date picker with custome string . Eg. `2017/02/04`  |
| **`style`** | `ViewStyle` | Optional. Main Datepicker style . Default is '{}' |
| **`showTitleDate`** | `Boolean` |  Optional. Show current date in the header of date picker . Default is `false` |
| **`titleDateFormat`** | `String` |  Optional. Change format of header date . Default is `dddd - jMM - jYYYY` |
| **`TitleDateStyle`** | `ViewStyle` |  Optional. Change style of header dare. Default is `{}` |
| **`btnColor`** | `String` | Optional. BackgroundColor for Top and bottom Buttons |
| **`btnStyle`** | `ViewStyle` | Optional. Style Bottom and Top Buttons.|
| **`btnUnderlayColor`** | `String` | Optional. UderlayColor colors for buttons |
| **`arrowTintColor`** | `String` | Optional. Change color of buttons arrow . |
| **`arrowSize`** | `Number` | Optional. Change arrows size . |
| **`dateBoxStyle`** | `ViewStyle` | Optional. Middle date box style . |
| **`dateStyle`** | `ViewStyle` | Optional. Change current date style like fontFamily , color , FontSize . |
| **`onChangeDate`** | `Function` | Optional. return date on changing |




# Suggestions?

Open Issues. Submit PRs.
