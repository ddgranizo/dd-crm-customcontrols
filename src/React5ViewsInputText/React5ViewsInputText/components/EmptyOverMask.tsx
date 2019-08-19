import * as React from 'react';
import { IEmptyOverMaskState } from '../interfaces/IEmptyOverMaskState';
import { IEmptyOverMaskProps } from '../interfaces/IEmptyOverMaskProps';

export class EmptyOverMask extends React.Component<IEmptyOverMaskProps, IEmptyOverMaskState> {

    constructor(props: IEmptyOverMaskProps) {
        super(props);
    }

    _handlerOnFocusEmptyMask = (event: React.FocusEvent<HTMLInputElement>) => {
        this.props.focusHandler()
    }

    _handlerOnMouseLeave = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        this.props.leaveHandler()
    }

    render() {

        return (
            <div className="ReactWrapper-mainDiv">
                <div className="ReactWrapper-divFlex" >
                    <input
                        onFocus={this._handlerOnFocusEmptyMask}
                        onMouseLeave={this._handlerOnMouseLeave}
                        className="ReactWrapper-crmInputText"
                        type="text"
                        defaultValue="---" />
                </div>
            </div>
        )
    }
}


