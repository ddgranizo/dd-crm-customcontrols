import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactWrapper } from './components/ReactWrapper'
import IReactWrapperProps from "./interfaces/IReactWrapperProps";
import IAnnotationDataAccess from "./interfaces/IAnnotationDataAccess";
import AnnotationAccessDataFake from './services/fake/AnnotationAccessDataFake'

export class AttachFileWithAnnotations implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _value: string;
	private _context: ComponentFramework.Context<IInputs>;
	private _notifyOutputChanged: () => void;
	private _container: HTMLDivElement;
	private _guidPattern = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', 'i');

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this._container = document.createElement("div")
		this._notifyOutputChanged = notifyOutputChanged
		this._context = context

		container.appendChild(this._container)

		this.onChangeValue = this.onChangeValue.bind(this)
		this.onChangeValue(context.parameters.annotationIdProperty.raw)


		/* var confirmStrings = { text: "This is a confirmation.", title: "Confirmation Dialog", subtitle: "test subtitle", "cancelButtonLabel": "Test Cancel", confirmButtonLabel: "Test Confirm" };
		var confirmOptions = { height: 200, width: 500 };
		context.navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
			function (success) {
				if (success.confirmed)
					console.log("Dialog closed using OK button.");
				else
					console.log("Dialog closed using Cancel button or X.");
			}); */
	}

	public onChangeValue(value: string) {
		this._value = value;
		this._notifyOutputChanged();
	}



	public updateView(context: ComponentFramework.Context<IInputs>): void {
		this._value = context.parameters.annotationIdProperty.raw;
		var val = this._value.toLowerCase();
		if (val == "" || this._guidPattern.test(val)) {
			let props: IReactWrapperProps = {
				value: val,
				handlerChange: this.onChangeValue,
				openConfirmDialog: this._context.navigation.openConfirmDialog,
				context : this._context
			}
			ReactDOM.render(
				React.createElement(ReactWrapper, props)
				, this._container
			);
		} else {
			this.onChangeValue("");
		}
	}




	public getOutputs(): IOutputs {
		return {
			annotationIdProperty: this._value
		};
	}


	public destroy(): void {
		ReactDOM.unmountComponentAtNode(this._container);
	}

	public refreshData(evt: Event): void {
		this._notifyOutputChanged();
	}

}