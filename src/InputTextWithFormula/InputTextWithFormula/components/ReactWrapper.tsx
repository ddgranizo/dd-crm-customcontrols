import * as React from 'react';
import { IReactWrapperProps } from './../interfaces/IReactWrapperProps';
import { IReactWrapperState } from './../interfaces/IReactWrapperState';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import { Manager, Reference, Popper } from 'react-popper';
import { Overlay, OverlayTrigger, Tooltip, Badge } from 'react-bootstrap'
import { IValueIsEmpty } from '../interfaces/IValueIsEmpty';
import { IValue } from '../interfaces/IValue';
import { EmptyNoOverMask } from './EmptyNoOverMask';
import { EmptyOverMask } from './EmptyOverMask';
import { ValuedNoOverMaks } from './ValuedNoOverMaks';
import { ValuedOverMask } from './ValuedOverMask';
import { EditingComponent } from './EditingComponent';


export class ReactWrapper extends React.Component<IReactWrapperProps, IReactWrapperState> implements IValueIsEmpty {

    constructor(props: IReactWrapperProps) {
        super(props);
        this.state = {
            value: this.props.value,
            over: false,
            focused: false,
        };
    }

    valueIsEmpty(value: IValue): boolean {
        return value.numberValue == undefined || value.numberValue == null
    }

    componentWillReceiveProps(nextProps: IReactWrapperProps) {
        this.setState(prevState => ({
            value: nextProps.value,
            over: prevState.over,
            focused: prevState.focused
        }))
    }

    onFocus = () => {
        this.setState({ focused: true })
    }

    onLostFocus = () => {
        this.setState({ focused: false, over: false })
    }

    onLeave = () => {
        this.setState({ over: false })
    }

    onOver = () => {
        this.setState({ over: true })
    }

    onValueChange = (value: IValue) => {
        console.log(value);
        this.setState({ value })
    }

    onValueCommited = (value: IValue) => {
        this.props.handlerChange(value)
        this.setState({ value, focused: false, over: false })
    }

    getCurrentView() {
        const { over, focused, value } = this.state
        const valued = !this.valueIsEmpty(value)
        if (focused) {
            return <EditingComponent lostFocusHandler={this.onLostFocus} value={value} customProps={this.props.customProps} updatedHandler={this.onValueChange} commitedValueHandler={this.onValueCommited} ></EditingComponent>
        } else {
            if (!valued && !over) {
                return <EmptyNoOverMask focusHandler={this.onFocus} overHandler={this.onOver}></EmptyNoOverMask>
            } else if (!valued && over) {
                return <EmptyOverMask leaveHandler={this.onLeave} focusHandler={this.onFocus}></EmptyOverMask>
            } else if (valued && !over) {
                return <ValuedNoOverMaks overHandler={this.onOver} value={value} customProps={this.props.customProps} focusHandler={this.onFocus}></ValuedNoOverMaks>
            } else if (valued && over) {
                return <ValuedOverMask leaveHandler={this.onLeave} value={value} customProps={this.props.customProps} focusHandler={this.onFocus}></ValuedOverMask>
            }
        }
    }

    render() {
        return (
            <div className="ReactWrapper-container">
                {this.getCurrentView()}
            </div>
        )
    }
}

