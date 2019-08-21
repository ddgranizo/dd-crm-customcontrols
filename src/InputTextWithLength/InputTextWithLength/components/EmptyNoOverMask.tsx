import * as React from 'react';
import { IEmptyNoOverMaskProps } from './../interfaces/IEmptyNoOverMaskProps';
import { IEmptyNoOverMaskState } from './../interfaces/IEmptyNoOverMaskState';

export class EmptyNoOverMask extends React.Component<IEmptyNoOverMaskProps, IEmptyNoOverMaskState> {

    constructor(props: IEmptyNoOverMaskProps) {
        super(props);
    }

    _handlerOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this.props.focusHandler();
    }

    _handlerMouseMove = (event: React.MouseEvent<HTMLInputElement>) => {
        this.props.overHandler();
    }

    render() {

        return (
                <div className="ReactWrapper-mainDiv">
                    <div className="ReactWrapper-divFlex" >
                        <input
                            onFocus={this._handlerOnFocus}
                            onMouseMove={this._handlerMouseMove}
                            className="ReactWrapper-crmLabel"
                            type="text"
                            defaultValue="---" />
                    </div>
                </div>
        )
    }
}


