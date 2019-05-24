import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as angular from "angular";



export class AttachFileField implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _prefixDefinitions: string = "DD_AttachField_";
	private _annotationId: string;
	private _notifyOutputChanged: () => void;
	private _container: HTMLDivElement;

	private _wrapperId: string;
	private _controllerName: string;
	private _appName: string;

	private _appDiv: HTMLDivElement;
	private _currentValue: string;

	constructor() {

	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this._container = container;
		this._notifyOutputChanged = notifyOutputChanged;
		let randomInt: number = Math.floor(Math.floor(100) * Math.random());

		let _this = this;
		this._wrapperId = this.createUniqueId(context, `${this._prefixDefinitions}_wrapper`, randomInt);
		this._appName = this.createUniqueId(context, `${this._prefixDefinitions}_app`, randomInt);
		this._controllerName = this.createUniqueId(context, `${this._prefixDefinitions}_controller`, randomInt);

		this._appDiv = this.initializeAngularWrapper(this._wrapperId, this._controllerName, this._appName);
		this._appDiv.innerHTML = "<h1>hola</h1>";
		this._container.appendChild(this._appDiv);

		this._currentValue = context.parameters.annotationId.raw;

		var app = angular.module(this._appName, [])
			.controller(this._controllerName, ["$scope", ($scope) => {
				$scope.annotationId = this._currentValue;
				$scope.$watch('annotationId', (newVal: string) => {
					console.log("New val: " + newVal);
					_this._updateIfNeeded($scope.annotationId);
				});

			}]);
		/* this._currentValue = context.parameters.annotationId.raw;

		angular.module(this._controllerName, []); */
		/* angular.module(this._appName).controller(this._controllerName, ($scope) => {
			$scope.annotationId = this._currentValue;
			$scope.$watchCollection('annotationId', () => {
				_this._updateIfNeeded($scope.flipButtonModel);
			});
		});
		// Angular code. Create an App based on the new appDivId
		angular.element(document).ready(() => {
			angular.bootstrap(document.getElementById(_this._wrapperId)!, [_this._appName]);
		}); */
	}

	private _updateIfNeeded(newValue: string) {
		if ((newValue && !this._currentValue) || (!newValue && this._currentValue)) {
			

			console.log(newValue);
		}
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		const value = context.parameters.annotationId.raw;
		if (typeof(value) !== 'undefined' && value !== null) {
			this._currentValue = value;
			var $scope = angular.element(document.getElementById(this._wrapperId)!).scope();
			$scope.$apply(($scope: any) => {
				$scope.annotationId = value;
			});
		}
	}

	public getOutputs(): IOutputs {
		return { annotationId: this._annotationId };
	}

	public destroy(): void {

	}


	private bootstrapAngular() {

	}


	private initializeAngularWrapper(id: string, ngController: string, ngApp: string): HTMLDivElement {
		let appDiv: HTMLDivElement = document.createElement('div');
		appDiv.setAttribute("id", id);
		appDiv.setAttribute("ng-controller", ngController);
		appDiv.setAttribute("ng-app", ngApp);
		return appDiv;
	}

	private createUniqueId(context: ComponentFramework.Context<IInputs>, passInString: string, randomInt: number): string {
		return passInString + randomInt;
	}
}