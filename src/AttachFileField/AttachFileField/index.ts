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

	private _uploadImage: HTMLImageElement;
	private _downloadImage: HTMLImageElement;
	private _removeImage: HTMLImageElement;

	private _file: HTMLElement;

	private _currentValue: string;
	private _context: ComponentFramework.Context<IInputs>;


	private _entityLogicalName: string;
	private _entityId: string;
	constructor() {

	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this._container = container;
		this._notifyOutputChanged = notifyOutputChanged;
		this._context = context;
		let randomInt: number = Math.floor(Math.floor(100) * Math.random());

		let _this = this;
		this._wrapperId = this.createUniqueId(context, `${this._prefixDefinitions}_wrapper`, randomInt);
		this._appName = this.createUniqueId(context, `${this._prefixDefinitions}_app`, randomInt);
		this._controllerName = this.createUniqueId(context, `${this._prefixDefinitions}_controller`, randomInt);

		this._appDiv = this.initializeAngularWrapper(this._wrapperId, this._controllerName, this._appName);
		this._appDiv.innerHTML = this._getView();;
		this._container.appendChild(this._appDiv);

		this._currentValue = context.parameters.annotationId.raw;

		this._uploadImage = document.getElementById('upload-image') as HTMLImageElement;
		this._downloadImage = document.getElementById('download-image') as HTMLImageElement;
		this._removeImage = document.getElementById('remove') as HTMLImageElement;

		this._file = document.getElementById('file-input') as HTMLElement;


		this._entityLogicalName = (this._context as any).page.entityTypeName;
		this._entityId = (this._context as any).page.entityId;

		console.log("Id:" + this._entityId);
		console.log("Entity:" + this._entityLogicalName);
		//this._file.addEventListener('change', this._readSingleFile, false);
		/* this._context.resources
			.getResource
				('arrow-down.png', 
				(data) =>{console.log(data); this._setImage.bind(this, this._uploadImage, false, "png", data)},
				() => {console.error("Error loading image");} ); */



		console.log(this._context);

		var app = angular.module(this._appName, [])
			.controller(this._controllerName, ["$scope", '$q', '$window', ($scope, $q, $window) => {
				$scope.annotationId = this._currentValue;
				$scope._entityId = this._entityId;
				$scope._entityLogicalName = this._entityLogicalName;

				$scope.hasContextId = false;
				$scope._context = this._context;

				$scope.showUpload = false;
				$scope.showDonwload = false;
				$scope.showRemove = false;
				$scope.isChekingIsAnnotationExits = false;
				$scope.isValidId = false;
				$scope.isProcessingFile = false;
				$scope.isCheckedIfValidAnnotationId = false;
				$scope.currentRecord = null;


				$scope.isVisibleLoading = function () {
					return !$scope.isChekingIsAnnotationExits;
				}

				$scope.isVisibleUpload = function () {
					return typeof $scope.annotationId === 'undefined' ||
						$scope.annotationId == null ||
						$scope.annotationId == "" ||
						!$scope.isUUID($scope.annotationId);
				}

				$scope.initialize = function () {
					//$scope.hasContextId = $scope.isUUID(this._entityId);
				}

				$scope.checkIfValidAnnotationId = function (annotationId: string) {
					$scope.isValidId = false;
					$scope.isChekingIsAnnotationExits = true;
					$scope.isCheckedIfValidAnnotationId = false;
					this._context.webAPI.retrieveMultipleRecords(`annotations?$filter=_objectid_value eq ${annotationId} `)
						.then(((record: any) => {
							if (record.length == 1) {
								$scope.isValidId = true;
								$scope.currentRecord = record[0];
							} else {
								$scope.isCheckedIfValidAnnotationId = true;
							}
							$scope.isChekingIsAnnotationExits = false;
						}));
				}


				$scope.uploadFile = function (event: Event) {
					console.log("picking file..");
					$scope._context.device.pickFile(
						(files: ComponentFramework.FileObject[]) => {
							console.log(files);
						},
						function () { console.log("Error reading the file"); }
					)
				}



				$scope.$watch('annotationId', (newVal: string) => {
					if ($scope.isUUID(newVal)) {
						$scope.checkIfValidAnnotationId();
					}
					if (newVal !== this._currentValue) {
						this._currentValue = newVal;
						this._notifyOutputChanged();
					}
				});

				$scope.isUUID = function (s: string) {
					return s.match("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");
				}

				$scope.readSingleFile = function (e: any) {
					var file = e.target.files[0];
					if (!file) {
						return;
					}
					$scope.processFile(file);
				}


				$scope.processFile = function (file: any) {
					$scope.isProcessingFile = true;
					const name: string = file.name;
					const mimeType: string = file.type;
					console.log("Processing file..");
					$scope.getBase64(file)
						.then((encoded: string) => {
							console.log("Uploading file..");
							const annotation =
								$scope.getAnnotation(name, mimeType, $scope._entityLogicalName, $scope._entityId, encoded);
							return this._context.webAPI.create(`annotation`, annotation);
						})
						.then((k: any) => {
							console.log("Uploaded file..");
							$scope.annotationId = k.id;
							$scope.isProcessingFile = false;
							$scope.checkIfValidAnnotationId()
						})
						.catch((e: Error)=>{
							console.error(e);
							$scope.isProcessingFile = false;
						})
				}

				$scope.getAnnotation = function (name: string, mimeType: string, entity: string, recordId: string, content: string) {
					var note = Object();
					note["subject"] = name;
					note["filename"] = name;
					note["mimetype"] = mimeType;
					note["objectid_contact@odata.bind"] = `${entity}/(${recordId})`;
					note["documentbody"] = content;
					return note;
				}


				$scope.getBase64 = function (file: any) {
					return new Promise((resolve, reject) => {
						const reader: FileReader = new FileReader();
						reader.readAsDataURL(file);
						reader.onload = () => resolve(reader.result as any);
						reader.onerror = error => reject(error);
					});
				}


				$scope.initialize();

			}])
			.directive('customOnChange', function () {
				return {
					restrict: 'A',
					link: function (scope, element, attrs) {
						var onChangeHandler = scope.$eval(attrs.customOnChange);
						element.on('change', onChangeHandler);
						element.on('$destroy', function () {
							element.off();
						});

					}
				};
			});

	}




	private _setImage(img: HTMLImageElement, shouldUpdateOutput: boolean, fileType: string, fileContent: string): void {
		let imageUrl: string = this._generateImageSrcUrl(fileType, fileContent);
		img.src = imageUrl;
		this._notifyOutputChanged();
	}


	private _generateImageSrcUrl(fileType: string, fileContent: string): string {
		return "data:image/" + fileType + ";base64, " + fileContent;
	}


	private _getView() {
		return [
			`<div class="fill-available" style="background-color: red">`,
			`	<div>`,
			`		<div ng-show="isVisibleUpload()"><input  custom-on-change="readSingleFile"  type="file" id="file-input" /></div>`,
			`		<div ng-show="isVisibleLoading()">Loading..</div>`,
			`		<img id="download-image" />`,
			`		<img id="remove" />`,
			`	</div>`,
			`</div>`
		]
			.join('');
	}

	private _updateIfNeeded(newValue: string) {
		if ((newValue && !this._currentValue) || (!newValue && this._currentValue)) {


			console.log(newValue);
		}
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		const value = context.parameters.annotationId.raw;
		if (typeof (value) !== 'undefined' && value !== null) {
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