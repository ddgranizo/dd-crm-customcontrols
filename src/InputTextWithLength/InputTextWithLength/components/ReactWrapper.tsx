import * as React from 'react';
import  IReactWrapperBasicProps  from './../interfaces/IReactWrapperProps';
import  IReactWrapperState  from './../interfaces/IReactWrapperState';

export class ReactWrapper extends React.Component<IReactWrapperBasicProps, IReactWrapperState> {

    constructor(props: IReactWrapperBasicProps) {
        super(props);

        this.state = {
            value: this.props.value
        };
    }

    componentWillReceiveProps(nextProps: IReactWrapperBasicProps) {
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


