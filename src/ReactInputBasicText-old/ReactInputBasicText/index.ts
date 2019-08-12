import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BasicInput} from './components/BasicInput'
import { BasicInputProps } from "./components/BasicInputProps";

export class ReactInputBasicText implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _value: string;
	private _notifyOutputChanged: () => void;
	private _container: HTMLDivElement;

	

	constructor() {

	}
	

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this._container = document.createElement("div");
		this._notifyOutputChanged = notifyOutputChanged;
		container.appendChild(this._container);
		console.log("init");

		this.onChangeValue = this.onChangeValue.bind(this);
	}

	public onChangeValue(value: string){
		this._value = value;
		console.log(this._value);
		this._notifyOutputChanged();
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		this._value = context.parameters.textProperty.raw;
		console.log("updateView", this._value);
		let props : BasicInputProps = {
			value: this._value,
			handlerChange : this.onChangeValue
		}
		ReactDOM.render(
			React.createElement(BasicInput, props)
			, this._container
		);
	}


	public getOutputs(): IOutputs {
		console.log("getOutputs", this._value);
		return {
			textProperty: this._value
		};
	}


	public destroy(): void {
		ReactDOM.unmountComponentAtNode(this._container);
	}

	public refreshData(evt: Event): void {
		this._notifyOutputChanged();
	}

}