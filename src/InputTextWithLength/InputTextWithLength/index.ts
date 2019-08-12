import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactWrapper } from './components/ReactWrapper'
import IReactWrapperProps  from "./interfaces/IReactWrapperProps";

export class InputTextWithLength implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _value: string;
	private _notifyOutputChanged: () => void;
	private _container: HTMLDivElement;

	constructor() {
	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this._container = document.createElement("div");
		this._notifyOutputChanged = notifyOutputChanged;
		container.appendChild(this._container);
		this.onChangeValue = this.onChangeValue.bind(this);
	}

	public onChangeValue(value: string){
		this._value = value;
		this._notifyOutputChanged();
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		this._value = context.parameters.textProperty.raw;
		let props : IReactWrapperProps = {
			value: this._value,
			handlerChange : this.onChangeValue
		}
		ReactDOM.render(
			React.createElement(ReactWrapper, props)
			, this._container
		);
	}


	public getOutputs(): IOutputs {
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