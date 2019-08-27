import * as React from 'react';

import { IAttachManagerProps } from '../../interfaces/custom/IAttachManagerProps';
import { IAttachManagerState } from '../../interfaces/custom/IAttachManagerState';
import { IAnnotationDataAccess } from '../../interfaces/custom/IAnnotationDataAccess'
import XrmAnnotationDataAccessService from '../../services/XrmAnnotationDataAccessService';
import FakeAnnotationDataAccess from '../../services/fake/FakeAnnotationDataAccess';
import { Spinner } from 'react-bootstrap';
import { CrmSpinner } from './CrmSpinner';
import { ErrorMessage } from './ErrorMessage';
import { RemoveCurrentAnnotation } from './RemoveCurrentAnnotation';
import { FileSelector } from './FileSelector';
import { InfoMessage } from './InfoMessage';
export class AttachManager extends React.Component<IAttachManagerProps, IAttachManagerState> {

    _annotationAccessData: IAnnotationDataAccess;
    _alreadyCheckedEntityHasAnnotations: boolean;
    _cachedEntityHasAnnotationsValue: boolean;
    constructor(props: IAttachManagerProps) {
        super(props);
        this._alreadyCheckedEntityHasAnnotations = false;
        this._cachedEntityHasAnnotationsValue = false;
        this.state = this.getInitialState(this.props.annotationId)

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            this._annotationAccessData = new FakeAnnotationDataAccess(true);
        } else {
            this._annotationAccessData = new XrmAnnotationDataAccessService(props.context)
        }
    }

    getInitialState(annotationId: string) {
        return {
            annotationId: annotationId,
            isCreationMode: false,
            loading: true,
            entityHasAnnotations: this._cachedEntityHasAnnotationsValue,
            validAnnotation: false,
            existsAnnotation: false,
            annotationInfo: { name: "", type: "" },
        }
    }

    componentWillReceiveProps(nextProps: IAttachManagerProps) {
        this.changeCurrentAnnotationId(nextProps.annotationId);
    }

    removeCurrentAnnotation = () => {
        var confirmStrings = { text: "Confirm? The operation cannot be undone", title: "Confirm delete", subtitle: "The file will be deleted from the database", "cancelButtonLabel": "Cancel", confirmButtonLabel: "Confirm" };
        var confirmOptions = { height: 200, width: 500 };
        let self = this;
        this.props.openConfirmDialog(confirmStrings, confirmOptions).then(
            async function (success: any) {
                if (success.confirmed) {
                    const currentId = self.state.annotationId;
                    if (self.isValidGuid(currentId)) {
                        const exists = await self._annotationAccessData.existsAnnotation(currentId);
                        if (exists) {
                            await self._annotationAccessData.deleteAnnotation(currentId)
                        }
                    }
                    self.updateCurrentAnnotation("")
                }
            });

    }

    updateCurrentAnnotation = (annotationId: string) => {
        this.props.updatedHandler(annotationId);
    }

    changeCurrentAnnotationId(annotationId: string) {
        this.setState(this.getInitialState(annotationId),
            async () => { await this.checkAnnotation(annotationId) });
    }

    async componentDidMount() {
        await this.checkAnnotation(this.state.annotationId);
    }

    unsetLoading() {
        this.setState({ loading: false })
    }

    async checkAnnotation(id: string) {

        const isCreationMode = this._annotationAccessData.isCreationMode();
        if (isCreationMode) {
            this.setState({ isCreationMode: true })
            return;
        }

        let entityHasAnnotations = this._cachedEntityHasAnnotationsValue;
        if (!this._alreadyCheckedEntityHasAnnotations) {
            entityHasAnnotations = await this._annotationAccessData.entityHasAnnotations()
            this._cachedEntityHasAnnotationsValue = entityHasAnnotations
            this._alreadyCheckedEntityHasAnnotations = true
            this.setState({ entityHasAnnotations })
        }

        if (entityHasAnnotations) {
            if (!this.isEmpty(id)) {
                if (this.isValidGuid(id)) {
                    const existsAnnotation = await this._annotationAccessData.existsAnnotation(id);
                    this.setState({ existsAnnotation, validAnnotation: true })
                    if (existsAnnotation) {
                        const info = await this._annotationAccessData.getAnnotationInfo(id)
                        this.setState({ annotationInfo: info })
                        this.unsetLoading();
                    } else {
                        this.unsetLoading();
                    }
                } else {
                    this.setState({ validAnnotation: false })
                    this.unsetLoading()
                }
            } else {
                this.setState({ validAnnotation: true })
                this.unsetLoading()
            }
        } else {
            this.unsetLoading()
        }
    }

    isEmpty(text: any) {
        return typeof (text) === 'undefined' || text == null || text === ""
    }
    isValidGuid(text: string) {
        return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(text)
    }


    selectedFile = (name: string, type: string, content: string) => {
        this.setState({ loading: true }, async () => {
            const guid = await this._annotationAccessData.uploadFile(this.props.currentEntityId, name, type, content)
            this.updateCurrentAnnotation(guid)
        })
    }


    downloadFile = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        const content = await this._annotationAccessData.getAnnotationContent(this.state.annotationId);
        const downloadLink = document.createElement("a")
        const { name, type } = this.state.annotationInfo
        const fileName = name
        downloadLink.href = `data:${type};base64,${content}`;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    getCurrentRender() {
        const {
            loading,
            entityHasAnnotations,
            validAnnotation,
            existsAnnotation,
            annotationId,
            annotationInfo,
            isCreationMode } = this.state

        if (isCreationMode) {
            return <InfoMessage message="Save record first"></InfoMessage>
        }
        if (loading) {
            return <CrmSpinner></CrmSpinner>
        }
        if (!entityHasAnnotations) {
            return <ErrorMessage message="Current entity hasn't enabled annotations flag. Enable it first."></ErrorMessage>
        }
        if (!validAnnotation) {
            return <div className="AttachManager-RowWrapper">
                <ErrorMessage message="Current value isn't valid value of annotation id."></ErrorMessage>
                <RemoveCurrentAnnotation handlerRemove={this.removeCurrentAnnotation}></RemoveCurrentAnnotation>
            </div>
        }
        if (validAnnotation && this.isEmpty(annotationId)) {
            return <FileSelector selectedFile={this.selectedFile}></FileSelector>
        }
        if (!existsAnnotation) {
            return <div className="AttachManager-RowWrapper">
                <ErrorMessage message="Can't find current annotation."></ErrorMessage>
                <RemoveCurrentAnnotation handlerRemove={this.removeCurrentAnnotation}></RemoveCurrentAnnotation>
            </div>
        }
        return <div className="AttachManager-RowWrapper">
            <span><a href="#" onClick={this.downloadFile}>{annotationInfo.name}</a></span>
            <RemoveCurrentAnnotation handlerRemove={this.removeCurrentAnnotation}></RemoveCurrentAnnotation>
        </div>
    }

    render() {
        return (<div className="EditingComponent-MainContainer">
            {this.getCurrentRender()}
        </div>
        )
    }
}


