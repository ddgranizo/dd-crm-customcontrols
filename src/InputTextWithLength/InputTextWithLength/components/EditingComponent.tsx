import * as React from 'react';
import { IEditingComponentProps } from '../interfaces/IEditingComponentProps';
import { IEditingComponentState } from '../interfaces/IEditingComponentState';
import { IValue } from '../interfaces/IValue';
import { Length } from './custom/Length';

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
        const newValue: IValue = {
            stringValue: event.target.value
        }
        this.props.updatedHandler(newValue)
        this.setState({ value: newValue })
        
    }



    render() {
        const { value } = this.state;
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
                <Length text={value.stringValue}></Length>
            </div>
        )
    }
}


