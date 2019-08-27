import * as React from 'react';
import { IEditingComponentProps } from '../interfaces/IEditingComponentProps';
import { IEditingComponentState } from '../interfaces/IEditingComponentState';
import { IValue } from '../interfaces/IValue';
import { ResultFormula } from './custom/ResultFormula';

export class EditingComponent extends React.Component<IEditingComponentProps, IEditingComponentState> {

    constructor(props: IEditingComponentProps) {
        super(props);
        this.state = {
            value: props.value,
            valueString: String(props.value.numberValue)
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
        let nextValue: number | undefined;
        let raiseUpdateHandler = true;
        if (value == "" || value == null) {
            nextValue = 0;
        } else if (this.isNumeric(value)) {
            nextValue = parseFloat(value)
        } else {
            raiseUpdateHandler = false;
        }
        if (raiseUpdateHandler) {
            const newValue: IValue = {
                numberValue: nextValue
            }
            this.setState({ value: newValue })
            this.props.updatedHandler(newValue)
        }
        this.setState({ valueString: value })
    }


    isNumeric(num: any) {
        return !isNaN(num)
    }

    render() {
        const { value, valueString } = this.state
        const { formula, name, units } = this.props.customProps
        return (
            <div className="ReactWrapper-mainDiv">
                <div className="ReactWrapper-divFlex" >
                    <input
                        type="text"
                        ref="inputDataRef"
                        onBlur={this._handlerOnBlur}
                        onChange={this._handlerOnChange}
                        className="ReactWrapper-crmInputText"
                        value={valueString} />
                </div>
                <ResultFormula
                    value={value}
                    formula={formula}
                    name={name}
                    units={units}
                />
            </div>
        )
    }
}


