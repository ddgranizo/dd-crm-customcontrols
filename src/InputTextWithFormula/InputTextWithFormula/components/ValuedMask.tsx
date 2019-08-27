import * as React from 'react';
import { IValuedMaksProps } from '../interfaces/IValuedMaskProps';
import { IValuedMaskState } from '../interfaces/IValuedMaskState';
import { ResultFormula } from './custom/ResultFormula';

export class ValuedMask extends React.Component<IValuedMaksProps, IValuedMaskState> {

    constructor(props: IValuedMaksProps) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    _handlerOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this.props.focusHandler();
    }

    componentWillReceiveProps(nextProps: IValuedMaksProps) {
        this.setState({ value: nextProps.value })
    }

    render() {
        const { value } = this.state;
        const { formula, name, units } = this.props.customProps
        return (
            <div className="ReactWrapper-mainDiv">
                <div className="ReactWrapper-divFlex" >
                    <input
                        onFocus={this._handlerOnFocus}
                        onChange={() => { }}
                        className="ReactWrapper-crmLabel"
                        type="text"
                        value={value.numberValue} />
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


