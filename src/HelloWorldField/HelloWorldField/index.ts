import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as $ from "jquery";

export class HelloWorldField implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container: HTMLDivElement;
	private _notifyOutputChanged: () => void
	private _text: string;

	constructor() {

	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this.initializeWrapper(container);
		this._notifyOutputChanged = notifyOutputChanged;
		$('#wrapper').append('<div style="background: red"><input type="text" id="myText"></input></div>');
		$('#myText').on('change', (e) => {
			this._text = $('#myText').val() as string;
			this._notifyOutputChanged();
		});
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		console.log(context);
		this._text = context.parameters.textProperty.formatted as string;
		this.refreshUI();
	}

	public getOutputs(): IOutputs {
		return {
			textProperty: this._text
		};
	}

	public destroy(): void {
		// Add code to cleanup control if necessary
	}

	private refreshUI(): void {
		$("#myText").val(this._text);
	}

	private initializeWrapper(container: HTMLDivElement): void {
		this._container = document.createElement('div');
		this._container.setAttribute('id', 'wrapper');
		container.appendChild(this._container);
	}
}