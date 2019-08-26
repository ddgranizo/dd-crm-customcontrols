import * as React from 'react';
import { IValuedOverMaskProps } from '../interfaces/IValuedOverMaskProps';
import { IValuedOverMaskState } from '../interfaces/IValuedOverMaskState';
import { IEditingComponentProps } from '../interfaces/IEditingComponentProps';
import { IEditingComponentState } from '../interfaces/IEditingComponentState';
import { IValue } from '../interfaces/IValue';

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
        this.props.commitedValueHandler(newValue);
    }


    _handlerOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value;
        let nextValue : number | undefined;
        if (value == "" || value == null) {
            nextValue = undefined;
        }else if (this.isNumeric(value)) {
            nextValue =  parseInt(value)
        }else{
            return;
        }
        const newValue: IValue = {
            numberValue: nextValue
        }
        this.props.updatedHandler(newValue)
        this.setState({ value: newValue })
    }


    isNumeric(num: any) {
        return !isNaN(num)
    }

    render() {
        const { value } = this.state;
        return (
            <div className="ReactWrapper-mainDiv">
                <div className="ReactWrapper-divFlex" >
                    <input
                        type="text"
                        ref="inputDataRef"
                        onBlur={this._handlerOnBlur}
                        onChange={this._handlerOnChange}
                        className="ReactWrapper-crmInputText"
                        value={value.numberValue} />
                </div>
            </div>
        )
    }
}


