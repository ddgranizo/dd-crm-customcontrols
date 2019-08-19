import * as React from 'react';
import { IValuedNoOverMaskProps } from '../interfaces/IValuedNoOverMaskProps';
import { IValuedNoOverMaskState } from '../interfaces/IValuedNoOverMaskState';
import { IsValidPattern } from './custom/IsValidPattern';

export class ValuedNoOverMaks extends React.Component<IValuedNoOverMaskProps, IValuedNoOverMaskState> {

    constructor(props: IValuedNoOverMaskProps) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }


    _handlerOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this.props.focusHandler();
    }

    _handlerMouseMove = (event: React.MouseEvent<HTMLInputElement>) => {
        this.props.overHandler();
    }

    componentWillReceiveProps(nextProps: IValuedNoOverMaskProps) {
        console.log("newProps:", nextProps.value.stringValue);
        this.setState({ value: nextProps.value })
    }


    render() {
        const { value } = this.state
        const { customProps } = this.props
        return (
            <div className="ReactWrapper-mainDiv">
                <div className="ReactWrapper-divFlex" >
                    <input
                        onFocus={this._handlerOnFocus}
                        onMouseMove={this._handlerMouseMove}
                        onChange={() => { }}
                        className="ReactWrapper-crmLabel"
                        type="text"
                        value={value.stringValue} />
                </div>
                <div>
                    <IsValidPattern errorMessage={customProps.errorMessage} text={value.stringValue} pattern={customProps.pattern}></IsValidPattern>
                </div>
            </div>
        )
    }
}


