import * as React from 'react';
import { IReactWrapperProps } from './../interfaces/IReactWrapperProps';
import { IReactWrapperState } from './../interfaces/IReactWrapperState';
import { IValueIsEmpty } from '../interfaces/IValueIsEmpty';
import { IValue } from '../interfaces/IValue';
import { EditingComponent } from './EditingComponent';


export class ReactWrapper extends React.Component<IReactWrapperProps, IReactWrapperState> implements IValueIsEmpty {

    constructor(props: IReactWrapperProps) {
        super(props);
        this.state = {
            value: this.props.value,
            focused: false,
        };
    }

    valueIsEmpty(value: IValue): boolean {
        return value.stringValue === "" || value.stringValue == null
    }

    componentWillReceiveProps(nextProps: IReactWrapperProps) {
        this.setState(prevState => ({
            value: nextProps.value,
            focused: prevState.focused
        }))
    }

    onFocus = () => {
        this.setState({ focused: true })
    }

    onLostFocus = () => {
        this.setState({ focused: false})
    }

    onValueChange = (value: IValue) => {
        this.setState({ value })
    }

    onValueCommited = (value: IValue) => {
        this.props.handlerChange(value)
        this.setState({ value, focused: false })
    }

    getCurrentView() {
        const { value } = this.state
        return  <EditingComponent lostFocusHandler={this.onLostFocus} value={value} customProps={this.props.customProps} updatedHandler={this.onValueChange} commitedValueHandler={this.onValueCommited} ></EditingComponent>;
    }

    render() {
        return (
            <div className="ReactWrapper-container">
                {this.getCurrentView()}
            </div>
        )
    }
}

