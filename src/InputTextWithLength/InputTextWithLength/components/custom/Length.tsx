import * as React from 'react';
import { ILengthProps } from '../../interfaces/custom/ILengthProps';
import { ILengthState } from '../../interfaces/custom/ILengthState';

export class Length extends React.Component<ILengthProps, ILengthState> {

    constructor(props: ILengthProps) {
        super(props);
        this.state = {
            length: this.getLength(props.text)
        }
    }

    componentWillReceiveProps(nextProps: ILengthProps) {
        this.setState({ length: this.getLength(nextProps.text) })
    }

    getLength(text: string) {
        return text != null ? text.length : 0
    }

    render() {
        const { length } = this.state;
        return (
            <span className="Length-spanWrapper">{length}</span>
        )
    }
}


