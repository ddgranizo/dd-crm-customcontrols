import * as React from 'react';
import { IValuedNoOverMaskProps } from '../interfaces/IValuedNoOverMaskProps';
import { IValuedNoOverMaskState } from '../interfaces/IValuedNoOverMaskState';
import { Length } from './custom/Length';

export class ValuedNoOverMaks extends React.Component<IValuedNoOverMaskProps, IValuedNoOverMaskState> {

    constructor(props: IValuedNoOverMaskProps) {
        super(props);
        this.state = {
            value : this.props.value
        }
    }


    _handlerOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this.props.focusHandler();
    }

    _handlerMouseMove = (event: React.MouseEvent<HTMLInputElement>) => {
        this.props.overHandler();
    }

    componentWillReceiveProps(nextProps: IValuedNoOverMaskProps){
        this.setState({value: nextProps.value})
    }
  

    render() {
        const { value } = this.state;
        return (
                <div className="ReactWrapper-mainDiv">
                    <div className="ReactWrapper-divFlex" >
                        <input
                            onFocus={this._handlerOnFocus}
                            onMouseMove={this._handlerMouseMove}
                            onChange={()=>{}}
                            className="ReactWrapper-crmLabel"
                            type="text"
                            value={value.stringValue} />
                    </div>
                    <Length text={value.stringValue}></Length>
                </div>
        )
    }
}


