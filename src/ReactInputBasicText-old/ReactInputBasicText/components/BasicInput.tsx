import * as React from 'react';
import { BasicInputProps } from './BasicInputProps';

export class BasicInput extends React.Component<BasicInputProps, IBasicInputState> {

    constructor(props: BasicInputProps) {
        super(props);

        this.state = {
            value: this.props.value
        };
    }

    componentWillReceiveProps(nextProps: BasicInputProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({ value: nextProps.value })
        }

    }

    _handlerChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: event.target.value })
    }

    _handlerOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        this.props.handlerChange(this.state.value)
    }

    render() {
        return (
            <input id='inputText'
                value={this.state.value}
                onChange={this._handlerChangeValue}
                onBlur={this._handlerOnBlur}
            />
        )
    }
}