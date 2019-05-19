import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as $ from "jquery";

export class HelloWorldField implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container: HTMLDivElement;
	private _notifyOutputChanged: () => void
	private _text: string;

	private _textId = "myText";
	private _pathTextId = `#${this._textId}`;

	constructor() {

	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this.initializeWrapper(container);
		this._notifyOutputChanged = notifyOutputChanged;
		$('#wrapper').append(`<div><input class="fill-available" type="text" id="${this._textId}"></input></div>`);
		$(this._pathTextId).on('change', (e) => {
			this._text = $(this._pathTextId).val() as string;
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

	}

	private refreshUI(): void {
		$(this._pathTextId).val(this._text);
	}

	private initializeWrapper(container: HTMLDivElement): void {
		this._container = document.createElement('div');
		this._container.setAttribute('id', 'wrapper');
		container.appendChild(this._container);
	}
}