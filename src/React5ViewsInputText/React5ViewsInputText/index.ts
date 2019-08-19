import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactWrapper } from './components/ReactWrapper'
import { IReactWrapperProps } from "./interfaces/IReactWrapperProps";
import { ICustomProps } from "./interfaces/ICustomProps";
import { IValue } from "./interfaces/IValue";

export class React5ViewsInputText implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _value: IValue;
	private _notifyOutputChanged: () => void;
	private _container: HTMLDivElement;

	constructor() {
	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this._container = document.createElement("div");
		this._notifyOutputChanged = notifyOutputChanged;
		container.appendChild(this._container);
		this.onChangeValue = this.onChangeValue.bind(this);
		this.onChangeValue({ stringValue: context.parameters.textProperty.raw });
	}

	public onChangeValue(value: IValue) {
		this._value = value;
		this._notifyOutputChanged();
		
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		this._value = { stringValue: context.parameters.textProperty.raw };

		let customProps: ICustomProps = {
			
		}

		let value: IValue = this._value;
		
		let props: IReactWrapperProps = {
			value: value,
			handlerChange: this.onChangeValue,
			customProps: customProps
		}
		ReactDOM.render(
			React.createElement(ReactWrapper, props)
			, this._container
		);
	}

	public getOutputs(): IOutputs {
		return {
			textProperty: this._value.stringValue
		};
	}

	public destroy(): void {
		ReactDOM.unmountComponentAtNode(this._container);
	}

	public refreshData(evt: Event): void {
		this._notifyOutputChanged();
	}

}