import * as React from 'react';
import { IValuedOverMaskProps } from '../interfaces/IValuedOverMaskProps';
import { IValuedOverMaskState } from '../interfaces/IValuedOverMaskState';
import { Length } from './custom/Length';

export class ValuedOverMask extends React.Component<IValuedOverMaskProps, IValuedOverMaskState> {

    constructor(props: IValuedOverMaskProps) {
        super(props);
        this.state = {
            value : this.props.value
        }
    }

    _handlerOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this.props.focusHandler();
    }

    _handlerOnMouseLeave = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        this.props.leaveHandler();
    }

    componentWillReceiveProps(nextProps: IValuedOverMaskProps){
        this.setState({value: nextProps.value})
    }

    render() {
        const { value } = this.state;
        return (
                <div className="ReactWrapper-mainDiv">
                    <div className="ReactWrapper-divFlex" >
                        <input
                            onFocus={this._handlerOnFocus}
                            onMouseLeave={this._handlerOnMouseLeave}
                            onChange={()=>{}}
                            className="ReactWrapper-crmInputText"
                            type="text"
                            value={value.stringValue}
                            />
                    </div>
                    <Length text={value.stringValue}></Length>
                </div>
        )
    }
}


