import * as React from 'react';
import { IValuedOverMaskProps } from '../interfaces/IValuedOverMaskProps';
import { IValuedOverMaskState } from '../interfaces/IValuedOverMaskState';
import { IEditingComponentProps } from '../interfaces/IEditingComponentProps';
import { IEditingComponentState } from '../interfaces/IEditingComponentState';
import { IValue } from '../interfaces/IValue';
import { IsValidPattern } from './custom/IsValidPattern';

export class EditingComponent extends React.Component<IEditingComponentProps, IEditingComponentState> {

    constructor(props: IEditingComponentProps) {
        super(props);
        this.state = {
            value: props.value
        }
    }

    componentDidMount() {
        (this.refs.inputDataRef as HTMLInputElement).focus();
    }

    _handlerOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const newValue: IValue = this.state.value
        this.props.updatedHandler(newValue);
    }


    _handlerOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue: IValue = {
            stringValue: event.target.value
        }
        this.setState({ value: newValue })
    }



    render() {
        const { value } = this.state
        const { customProps } = this.props
        return (
            <div className="ReactWrapper-mainDiv">
                <div className="ReactWrapper-divFlex" >
                    <input
                        ref="inputDataRef"
                        onBlur={this._handlerOnBlur}
                        onChange={this._handlerOnChange}
                        className="ReactWrapper-crmInputText"
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


