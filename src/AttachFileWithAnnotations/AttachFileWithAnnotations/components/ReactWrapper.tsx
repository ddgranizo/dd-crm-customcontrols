import * as React from 'react'
import IReactWrapperBasicProps from './../interfaces/IReactWrapperProps'
import { IReactWrapperState } from './../interfaces/IReactWrapperState'
import IAnnotationAccessData from './../interfaces/IAnnotationDataAccess'
import AnnotationAccessDataFake from './../services/fake/AnnotationAccessDataFake'
import { Spinner, ProgressBar } from 'react-bootstrap';
import { FaTimesCircle, FaTrash, FaArrowCircleDown } from 'react-icons/fa';
import { FileSelector } from './FileSelector';
import { CrmSpinner } from './CrmSpinner';
import AnnotationAccessDataService from '../services/AnnotationAccessDataService';



export class ReactWrapper extends React.Component<IReactWrapperBasicProps, IReactWrapperState> {

    _annotationAccessData: IAnnotationAccessData;
    _fileSelector: HTMLInputElement;

    constructor(props: IReactWrapperBasicProps) {
        super(props);
        //this._annotationAccessData = new AnnotationAccessDataFake(true);
        this._annotationAccessData = new AnnotationAccessDataService(props.context)
        this.state = {
            value: this.props.value,
            loading: true,
            entityHasAnnotations: false,
            existsAnnotation: false,
            annotationInfo: {name: "", type: ""},
        };
    }

    componentDidMount() {
        this.checkAnnotation(this.state.value);
    }

    componentWillReceiveProps(nextProps: IReactWrapperBasicProps) {
        if (nextProps.value !== this.state.value) {
            const nextValue = nextProps.value;
            this.setState({
                value: nextValue,
                loading: true,
                entityHasAnnotations: false,
                existsAnnotation: false,
                annotationInfo: {name: "", type: ""},
            }, ()=>{this.checkAnnotation(nextValue)})
        }
    }

    _handlerOnRemoveCurrent = (event: React.MouseEvent<HTMLInputElement>) => {
        if (this.state.value != "" && !this.state.existsAnnotation) {
            this.props.handlerChange("")
        } else {
            this.shoyConfirmDeleteDialog()
        }
    }

    async confirmedDeleteAnnotation() {
        await this._annotationAccessData.deleteAnnotation(this.state.value)
        this.props.handlerChange("")
    }

    shoyConfirmDeleteDialog() {
        var confirmStrings = { text: "Confirm? The operation cannot be undone", title: "Confirm delete", subtitle: "The file will be deleted from the database", "cancelButtonLabel": "Cancel", confirmButtonLabel: "Confirm" };
        var confirmOptions = { height: 200, width: 500 };
        let self = this;
        this.props.openConfirmDialog(confirmStrings, confirmOptions).then(
            function (success: any) {
                if (success.confirmed) {
                    self.confirmedDeleteAnnotation()
                }
            });
    }


    setLoading() {
        this.setState({ loading: true })
    }

    unsetLoading() {
        this.setState({ loading: false })
    }


    async checkAnnotation(id: string) {
        const entityHasAnnotations = await this._annotationAccessData.entityHasAnnotations();
        this.setState({ entityHasAnnotations })
        if (entityHasAnnotations) {
            if (id !== "") {
                const existsAnnotation = await this._annotationAccessData.existsAnnotation(id);
                this.setState({ existsAnnotation })
                if (existsAnnotation) {
                    const info = await this._annotationAccessData.getAnnotationInfo(id)
                    this.setState({ annotationInfo: info })
                    this.unsetLoading();
                } else {
                    this.unsetLoading();
                }
            } else {
                this.setState({ existsAnnotation: true })
                this.unsetLoading()
            }
        } else {
            this.unsetLoading()
        }
    }


    _handlerSelectedNewFile = (name: string, type: string, content: string) => {
        this.setState({ loading: true }, async () => {
            const guid = await this._annotationAccessData.uploadFile(name, type, content)
            this.props.handlerChange(guid)
        })

    }

     _handlerDownloadClick = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        const content = await this._annotationAccessData.getAnnotationContent(this.state.value);
        const downloadLink = document.createElement("a")
        const {name, type} = this.state.annotationInfo
        const fileName = name
        downloadLink.href = `data:${type};base64,${content}`;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    render() {
        const {
            value,
            annotationInfo,
            loading,
            entityHasAnnotations,
            existsAnnotation
        } = this.state

        if (loading) {
            return (<CrmSpinner ></CrmSpinner>)
        } else {
            if (!entityHasAnnotations) {
                return (<span>This entity doesn't allow annotations. Please, activate it first.</span>)
            } else if (!existsAnnotation) {
                return (<div>
                    <span className="ReactWrapper-iconMessage"><FaTimesCircle></FaTimesCircle></span>
                    <span>Current annotation doesn't exists</span>
                    <span onClick={this._handlerOnRemoveCurrent} className="ReactWrapper-iconMessageClickable">
                        <FaTrash></FaTrash>
                    </span>
                </div>)
            } else {
                if (value === "") {
                    return <FileSelector selectedFile={this._handlerSelectedNewFile}></FileSelector>
                } else {
                    return (<div>
                        <span><a href="#" onClick={this._handlerDownloadClick}>{this.state.annotationInfo.name}</a></span>
                        <span onClick={this._handlerOnRemoveCurrent} className="ReactWrapper-iconMessage"><FaTrash></FaTrash></span>
                    </div>)
                }
            }
        }
    }
}


