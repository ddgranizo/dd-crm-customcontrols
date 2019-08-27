import * as React from 'react';
import { IEmptyMaskProps } from './../interfaces/IEmptyMaskProps';
import { IEmptyMaskState } from './../interfaces/IEmptyMaskState';

export class EmptyMask extends React.Component<IEmptyMaskProps, IEmptyMaskState> {

    constructor(props: IEmptyMaskProps) {
        super(props);
    }

    _handlerOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this.props.focusHandler();
    }


    render() {

        return (
                <div className="ReactWrapper-mainDiv">
                    <div className="ReactWrapper-divFlex" >
                        <input
                            onFocus={this._handlerOnFocus}
                            className="ReactWrapper-crmLabel"
                            type="text"
                            defaultValue="---" />
                    </div>
                </div>
        )
    }
}


