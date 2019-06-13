/**
 * Persian Date Picker Component
 *
 * Copyright 2018 Amir Najafi (github.com/Amirnajafi)
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */
 //  @flow
'use strict';
const React = require('react');
const moment = require('moment-jalaali');
import {Platform, StyleSheet, Text, TouchableHighlight, View ,  Image} from 'react-native';

let fastDay;
let today = moment();
moment.loadPersian({dialect: 'persian-modern' , usePersianDigits : true})

type Props = {
	defDate ?: moment.Date,
	defDateString ?: string,
	style ?: object , 
	showTitleDate ?: boolean , 
	titleDateFormat ?: string,
	TitleDateStyle ?: object,
	btnColor ?: string,
	btnStyle ?: object,
	btnUnderlayColor ?: string,
	TitleDateStyle ?: object , 
	arrowTintColor ?: string ,
	dateBoxStyle ?: string , 
	dateStyle ?: string , 
	arrowSize ?: number , 
	onChangeDate ?: void , 
}

export default class PersianDatePicker extends React.Component<Props> {
    constructor(props) {
		super(props);
		let defDate = null
		if(props.defDate){
			defDate = props.defDate
		}else if (props.defDateString){
			defDate = moment(props.defDateString)
		}
        this.state = {
            date : defDate ||  moment()
		}

	}

	dateDiff = (d1 ,d2) => {
		let date1 =  Date.parse(d1);
		let date2 =  Date.parse(d2);
		return date1 - date2
	}

	_changeDay = (day) => {
		let date = this.state.date
		date.add(day,"day");
		// if(this.dateDiff(today.format("YYYY/MM/DD") , date.format("YYYY/MM/DD")) < 0){return}
		this.setState({date : date } , ()=>{
			this.props.onChangeDate(date)
		})
	}

	_changeMonth = (month) => {
		let date = this.state.date
		date.add(month,"month");
		// if(this.dateDiff(today.format("YYYY/MM/DD") , date.format("YYYY/MM/DD")) < 0){return}
		this.setState({date : date }, ()=>{
			this.props.onChangeDate(date)
		})
	}

	_changeYear = (year) => {
		let date = this.state.date
		date.add(year,"year");
		// if(this.dateDiff(today.format("YYYY/MM/DD") , date.format("YYYY/MM/DD")) < 0){return}
		this.setState({date : date }, ()=>{
			this.props.onChangeDate(date)
		})
	}

	clearIntv = () =>{
		clearInterval(fastDay)
	}

	render() {
		const {date} = this.state
		return(
			
			<View style={[{alignSelf : "center"} , this.props.style]}>
				{this.props.showTitleDate &&
					<Text style={[{alignSelf : "center" , paddingTop : 5 , marginVertical : 10} , this.props.TitleDateStyle]}>{date.format(this.props.titleDateFormat ? this.props.titleDateFormat : "dddd - jMM - jYYYY")}</Text>
				}

				<View style={{flexDirection:"row-reverse"}}>
					<PickerButton
						{...this.props}
						date={date}
						title={date.format("jDD")}
						onPressOutTop={this.clearIntv}
						onLongPressTop={()=>{
							fastDay = setInterval(()=>{
								this._changeDay(1)
							},100)
						}}
						onPressTop={()=>{
							this._changeDay(1)
						}}
						onPressOutDown={this.clearIntv}
						onLongPressDown={()=>{
							fastDay = setInterval(()=>{
								this._changeDay(-1)
							},100)
						}}
						onPressDown={()=>{
							this._changeDay(-1)
						}}
					/>

					<PickerButton
						{...this.props}
						date={date}
						title={date.format("jMMMM")}
						onPressOutTop={this.clearIntv}

						onLongPressTop={()=>{
							fastDay = setInterval(()=>{
								this._changeMonth(1)
							},100)
						}}
						onPressTop={()=>{
							this._changeMonth(1)
						}}

						onPressOutDown={this.clearIntv}
						onLongPressDown={()=>{
							fastDay = setInterval(()=>{
								this._changeMonth(-1)
							},100)
						}}
						onPressDown={()=>{
							this._changeMonth(-1)
						}}
					/>

					<PickerButton
						{...this.props}
						date={date}
						title={date.format( "jYYYY")}
						onPressOutTop={this.clearIntv}
						onLongPressTop={()=>{
							fastDay = setInterval(()=>{
								this._changeYear(1)
							},100)
						}}
						onPressTop={()=>{
							this._changeYear(1)
						}}

						onPressOutDown={this.clearIntv}
						onLongPressDown={()=>{
							fastDay = setInterval(()=>{
								this._changeYear(-1)
							},100)
						}}
						onPressDown={()=>{
							this._changeYear(-1)
						}}
					/>
				</View>
			</View>
		)
	}
}

class PickerButton extends React.PureComponent {
	render(){
		const page_style = StyleSheet.create({
			middle_btn : {
				backgroundColor : "gray" ,
				marginTop : 5,
				alignSelf  :"center",
				marginBottom : 5 ,
				paddingTop : 10,
				paddingBottom : 10,
				width : 75,
				height : 35,
				borderRadius : 5 ,
				alignItems : "center",
				justifyContent : "center"
			},
			text : {
				textAlign : "center",
				color : "white",
				fontSize : 15,
			} ,
			button_top : {
				backgroundColor: this.props.btnColor || "#c0c1c3",
				borderTopLeftRadius : 50 ,
				borderTopRightRadius : 50 ,
				borderBottomLeftRadius : 5 ,
				borderBottomRightRadius : 5 ,
				height : 50,
				width : 75,
				alignSelf:"center",
				justifyContent : "center"
			},
			button_bototm : {
				backgroundColor: this.props.btnColor || "#c0c1c3",
				borderBottomLeftRadius : 50 ,
				borderBottomRightRadius : 50 ,
				borderTopLeftRadius : 5 ,
				borderTopRightRadius : 5 ,
				height : 50,
				width : 75,
				alignSelf:"center",
				justifyContent : "center"
			},
			button_arrow : {
				width : this.props.arrowSize || 20 , height : this.props.arrowSize || 20 , 
				tintColor : "white",
				transform: [{ rotate: '180deg'}],
				position : "absolute",
				alignSelf :"center",
				tintColor : this.props.arrowTintColor ||  "white"
			},
			top_arrow : {
				width : this.props.arrowSize || 20 , height :this.props.arrowSize ||  20 , 
				tintColor : "white",
				position : "absolute",
				alignSelf :"center",
				tintColor : this.props.arrowTintColor ||  "white"
				
			}
		})
		return(
			<View style={{flexDirection : "column" , marginHorizontal  : 5 }}>

				<TouchableHighlight
					underlayColor={this.props.btnUnderlayColor || "gray"}
					delayLongPress={500}
					onPressOut ={this.props.onPressOutTop}
					onLongPress={this.props.onLongPressTop}
					style={[page_style.button_top , this.props.btnStyle]}
					onPress={this.props.onPressTop}>
					<Image style={[page_style.top_arrow]} source={{uri : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFG2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMDYtMTNUMDk6MTU6MTQrMDQ6MzAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTA2LTEzVDA5OjE1OjUyKzA0OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA2LTEzVDA5OjE1OjUyKzA0OjMwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMSIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkRvdCBHYWluIDIwJSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowOWRlMTdlMy1lYmNjLTQ4ZTgtOWJhNi0yMTJiOTVlY2ZhNTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDlkZTE3ZTMtZWJjYy00OGU4LTliYTYtMjEyYjk1ZWNmYTU3IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MDlkZTE3ZTMtZWJjYy00OGU4LTliYTYtMjEyYjk1ZWNmYTU3Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowOWRlMTdlMy1lYmNjLTQ4ZTgtOWJhNi0yMTJiOTVlY2ZhNTciIHN0RXZ0OndoZW49IjIwMTktMDYtMTNUMDk6MTU6MTQrMDQ6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjWSyjMAAACTSURBVDiN5dMxDoIwFIDhHw1dvYN08WKewGspMnAL2NklYeAIxjyXJq2h9JXNhNf1/5KmzSuEbXPY2P8jiE9FS0uVm18YEYQRm5dPiDsvnYR5BvF5Q6OTMDcYjfi8xgBgeK6TZZ4kNpqvEuveXagpF1f1xP1LOo+QXsl/SQezmodkPjJw5s6VdxJ8eHACbsUeV/QLscpts3nDRPAAAAAASUVORK5CYII='}} />
				</TouchableHighlight>

				<View style={[page_style.middle_btn , this.props.dateBoxStyle]}>
					<Text style={[page_style.text , {fontSize : 18} , this.props.dateStyle]}>{this.props.title}</Text>
				</View>

				<TouchableHighlight
					underlayColor={this.props.btnUnderlayColor || "gray"}
					delayLongPress={500}
					onPressOut ={this.props.onPressOutDown}
					onLongPress={this.props.onLongPressDown}
					style={[page_style.button_bototm , this.props.btnStyle]}
					onPress={this.props.onPressDown}>
					<Image style={[page_style.button_arrow]} source={{uri : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFG2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMDYtMTNUMDk6MTU6MTQrMDQ6MzAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTA2LTEzVDA5OjE1OjUyKzA0OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA2LTEzVDA5OjE1OjUyKzA0OjMwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMSIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkRvdCBHYWluIDIwJSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowOWRlMTdlMy1lYmNjLTQ4ZTgtOWJhNi0yMTJiOTVlY2ZhNTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDlkZTE3ZTMtZWJjYy00OGU4LTliYTYtMjEyYjk1ZWNmYTU3IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MDlkZTE3ZTMtZWJjYy00OGU4LTliYTYtMjEyYjk1ZWNmYTU3Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowOWRlMTdlMy1lYmNjLTQ4ZTgtOWJhNi0yMTJiOTVlY2ZhNTciIHN0RXZ0OndoZW49IjIwMTktMDYtMTNUMDk6MTU6MTQrMDQ6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjWSyjMAAACTSURBVDiN5dMxDoIwFIDhHw1dvYN08WKewGspMnAL2NklYeAIxjyXJq2h9JXNhNf1/5KmzSuEbXPY2P8jiE9FS0uVm18YEYQRm5dPiDsvnYR5BvF5Q6OTMDcYjfi8xgBgeK6TZZ4kNpqvEuveXagpF1f1xP1LOo+QXsl/SQezmodkPjJw5s6VdxJ8eHACbsUeV/QLscpts3nDRPAAAAAASUVORK5CYII='}} />
				</TouchableHighlight>
			</View>
		)
	}

}