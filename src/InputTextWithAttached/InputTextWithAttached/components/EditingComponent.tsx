import * as React from 'react';
import { IValuedOverMaskProps } from '../interfaces/IValuedOverMaskProps';
import { IValuedOverMaskState } from '../interfaces/IValuedOverMaskState';
import { IEditingComponentProps } from '../interfaces/IEditingComponentProps';
import { IEditingComponentState } from '../interfaces/IEditingComponentState';
import { IValue } from '../interfaces/IValue';
import { AttachManager } from './custom/AttachManager';

export class EditingComponent extends React.Component<IEditingComponentProps, IEditingComponentState> {

    constructor(props: IEditingComponentProps) {
        super(props);
        this.state = {
            value: props.value
        }
    }

    componentWillReceiveProps(nextProps: IEditingComponentProps){
        this.setState({value: nextProps.value})
    }

    _handlerUpdate = (annotationId: string) => {
        const newValue: IValue = {
            stringValue: annotationId,
            currentEntityId: this.state.value.currentEntityId
        }
        this.props.commitedValueHandler(newValue)
        this.setState({ value: newValue })
    }


    render() {
        const { value } = this.state;
        return (
            <div className="ReactWrapper-mainDiv">
                <div className="ReactWrapper-divFlex" >
                    <AttachManager 
                        openConfirmDialog={this.props.customProps.context.navigation.openConfirmDialog}
                        currentEntityId={value.currentEntityId}
                        annotationId={value.stringValue} 
                        context={this.props.customProps.context}
                        updatedHandler={this._handlerUpdate}></AttachManager>
                </div>
            </div>
        )
    }
}


