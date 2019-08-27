import * as React from 'react';
import { IValuedMaskProps } from '../interfaces/IValuedMaskProps';
import { IValuedMaskState } from '../interfaces/IValuedMaskState';
import { Length } from './custom/Length';

export class ValuedMask extends React.Component<IValuedMaskProps, IValuedMaskState> {

    constructor(props: IValuedMaskProps) {
        super(props);
        this.state = {
            value : this.props.value
        }
    }


    _handlerOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this.props.focusHandler();
    }

    componentWillReceiveProps(nextProps: IValuedMaskProps){
        this.setState({value: nextProps.value})
    }
  

    render() {
        const { value } = this.state;
        return (
                <div className="ReactWrapper-mainDiv">
                    <div className="ReactWrapper-divFlex" >
                        <input
                            onFocus={this._handlerOnFocus}
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


