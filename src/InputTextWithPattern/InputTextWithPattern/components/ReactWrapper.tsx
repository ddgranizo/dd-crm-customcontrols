import * as React from 'react';
import IReactWrapperBasicProps from './../interfaces/IReactWrapperProps';
import IReactWrapperState from './../interfaces/IReactWrapperState';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import { Manager, Reference, Popper } from 'react-popper';
import { Overlay, OverlayTrigger, Tooltip, Badge } from 'react-bootstrap'

export class ReactWrapper extends React.Component<IReactWrapperBasicProps, IReactWrapperState> {

    constructor(props: IReactWrapperBasicProps) {
        super(props);
        this.state = {
            value: this.props.value,
            isValid: this.checkIsValid(this.props.value, this.props.pattern)
        };
    }

    componentWillReceiveProps(nextProps: IReactWrapperBasicProps) {
        if (nextProps.value !== this.state.value) {
            this.updateState(nextProps.value, nextProps.pattern)
        }
    }

    updateState(value: string, pattern: RegExp) {
        const isValid = this.checkIsValid(value, pattern)
        this.setState({ value, isValid })
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

    render() {
        const { value, isValid } = this.state;
        return (
            <div className="ReactWrapper-container">
                <input type="text" value={value} onChange={this._handlerChangeValue} onBlur={this._handlerOnBlur} />
                <div className="ReactWrapper-isValidContainer">
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
            </div>
        )
    }
}


