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
        return value.stringValue === "" || value.stringValue == null
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
        this.props.handlerChange(value)
        this.setState({ value, focused: false, over: false });
    }

    getCurrentView() {
        const { over, focused, value } = this.state;
        const valued = !this.valueIsEmpty(value);
        if (focused) {
            return <EditingComponent lostFocusHandler={this.onLostFocus} value={value} customProps={this.props.customProps} updatedHandler={this.onValueChange}></EditingComponent>
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


/* export class ReactWrapper extends React.Component<IReactWrapperProps, IReactWrapperState> {

    constructor(props: IReactWrapperProps) {
        super(props);
        this.state = {
            value: this.props.value,
            isValid: this.checkIsValid(this.props.value, this.props.pattern),
            mouseOver: false,
            emptyMaskVisible: this.props.value === "" || this.props.value == null
        };
    }

    componentWillReceiveProps(nextProps: IReactWrapperProps) {
        if (nextProps.value !== this.state.value) {
            this.updateState(nextProps.value, nextProps.pattern)
        }
    }

    updateState(value: string, pattern: RegExp) {
        const isValid = this.checkIsValid(value, pattern)
        this.setState({ value, isValid, emptyMaskVisible: value === "" || value == null })
    }

    checkIsValid(value: string, pattern: RegExp) {
        return value == null || pattern.test(value)
    }

    _handlerChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.updateState(event.target.value, this.props.pattern)
    }

    _handlerOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        this.props.handlerChange(this.state.value)
    }


    _handlerMouseLeave = (event: React.MouseEvent<HTMLInputElement>) => {
        const emptyMaskVisible = this.state.value === "" || this.state.value == null;
        this.setState({ mouseOver: false, emptyMaskVisible });
    }

    _handlerMouseOver = (event: React.MouseEvent<HTMLInputElement>) => {
        this.setState({ mouseOver: true })
    }

    _handlerEmptyMaskFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this.setState({ emptyMaskVisible: false })
    }

    render() {
        const { value, isValid, mouseOver, emptyMaskVisible } = this.state;
        return (
            <div className="ReactWrapper-container">
                <div className="ReactWrapper-mainDiv">
                    {
                        <div className="ReactWrapper-divFlex" >
                            {
                                !emptyMaskVisible
                                    ? <input
                                        onMouseLeave={this._handlerMouseLeave}
                                        onMouseOver={this._handlerMouseOver}
                                        className={mouseOver ? 'ReactWrapper-crmInputText' : 'ReactWrapper-crmLabel'}
                                        type="text"
                                        value={value}
                                        onChange={this._handlerChangeValue}
                                        onBlur={this._handlerOnBlur} />
                                    : <input
                                        onFocus={this._handlerEmptyMaskFocus}
                                        onMouseLeave={this._handlerMouseLeave}
                                        onMouseOver={this._handlerMouseOver}
                                        className={mouseOver ? 'ReactWrapper-crmInputText' : 'ReactWrapper-crmLabel'}
                                        type="text"
                                        value="---" />
                            }
                        </div>
                    }
                </div>
                {
                    value
                        ? <div className="ReactWrapper">
                            {isValid
                                ? <span ><FaCheckCircle className="ReactWrapper-isValid" /></span>
                                : <span >
                                    <OverlayTrigger
                                        placement="left"
                                        key="tooltip"
                                        overlay={
                                            <Tooltip id="leftTooltip">
                                                <div className="ReactWrapper-tooltipContainer">{this.props.errorMessage}</div>
                                            </Tooltip>
                                        }
                                    >
                                        <FaTimesCircle className="ReactWrapper-isNotValid" />
                                    </OverlayTrigger>
                                </span>}
                        </div>
                        : null
                }
            </div>
        )
    }
} */


