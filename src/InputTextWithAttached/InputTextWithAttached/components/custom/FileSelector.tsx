import * as React from 'react'
import { IFileSelectorProps } from './../../interfaces/custom/IFileSelectorProps';
import { FaArrowUp } from 'react-icons/fa';



export class FileSelector extends React.Component<IFileSelectorProps, {}> {

    constructor(props: IFileSelectorProps) {
        super(props);

        this.onFilesChange = this.onFilesChange.bind(this)
        this._handleFileChange = this._handleFileChange.bind(this)
    }

    componentDidMount() {

    }

    _handleFileSelect = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        (this.refs.inputFile as HTMLInputElement).click()
    }

    _handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null) {
            this.onFilesChange(event.target.files as FileList)
        }
    }

    onFilesChange = (selectorFiles: FileList) => {
        var file = selectorFiles[0]
        var name = file.name;
        var type = file.type;
        var reader = new FileReader()
        let self = this;
        reader.onload = function (e: any) {
            var binaryData = e.target.result;
            var base64String = window.btoa(binaryData);
            self.props.selectedFile(name, type, base64String)
        }.bind(this)

        reader.readAsBinaryString(file);
    }

    render() {
        return (<div className="FileSelector-divWrapper">
            <FaArrowUp className="FileSelector-iconMessage"></FaArrowUp>
            <a href="" onClick={this._handleFileSelect}>Select file</a>
            <input className="FileSelector-hidden" ref="inputFile" type="file" onChange={this._handleFileChange} />
        </div>)
    }
}


