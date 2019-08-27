import { IAnnotationDataAccess } from './../interfaces/custom/IAnnotationDataAccess'
import { IInputs } from '../generated/ManifestTypes';

export default class XrmAnnotationDataAccessService implements IAnnotationDataAccess {

    _context: ComponentFramework.Context<IInputs>;
    _currentEntity: string;
    _annotationEntityName: string;
    _currentUrl: string;
    constructor(context: ComponentFramework.Context<IInputs>) {
        this._context = context
        this._currentUrl = (this._context as any).page.getClientUrl()
        this._currentEntity = (this._context as any).page.entityTypeName
        this._annotationEntityName = "annotation";
    }

    isCreationMode(): boolean {
        return (this._context as any).page.entityId == null
    }

    getApiEndpoint() {
        return `${this._currentUrl}/api/data/v9.1/`
    }
    async getAnnotationContent(id: string): Promise<string> {
        return fetch(`${this.getApiEndpoint()}annotations(${id})?$select=documentbody`)
            .then(k => k.json())
            .then(k => k.documentbody)
    }

    async deleteAnnotation(id: string): Promise<void> {
        return fetch(`${this.getApiEndpoint()}annotations(${id})`, { method: 'delete' })
            .then(k => { })
    }

    async entityHasAnnotations(): Promise<boolean> {
        return fetch(`${this.getApiEndpoint()}/EntityDefinitions(LogicalName='${this._currentEntity}')?$select=HasNotes`)
            .then(k => k.json())
            .then(k => { return k.HasNotes })
    }


    async existsAnnotation(id: string): Promise<boolean> {
        return fetch(`${this.getApiEndpoint()}annotations?$select=annotationid&$filter=annotationid eq (${id})`)
            .then(k => k.json())
            .then(k => k.value.length > 0);
    }



    async uploadFile(currentEntityId: string, name: string, type: string, content: string): Promise<string> {
        const annotationId = this.uuidv4()
        const bindPlace = `objectid_${this._currentEntity}@odata.bind`
        let annotation = {
            annotationid: annotationId,
            isdocument: true,
            subject: name,
            objecttypecode: this._currentEntity,
            mimetype: type,
            documentbody: content,
            filename: name,
            notetext: name
        }
        return fetch(`${this.getApiEndpoint()}EntityDefinitions(LogicalName='${this._currentEntity}')?$select=EntitySetName`)
            .then(k => k.json())
            .then(k => {
                const setName = k.EntitySetName
                const annotationObj = annotation as any;
                annotationObj[bindPlace] = `/${setName}(${currentEntityId})`
                const postSettings = {
                    method: 'post',
                    body: JSON.stringify(annotationObj),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "OData-MaxVersion": "4.0",
                        "OData-Version": "4.0",
                        "Accept": "application/json",
                    }
                }
                return fetch(`${this.getApiEndpoint()}annotations`, postSettings)
            })
            .then(k => { return annotationId })
    };

    async getAnnotationInfo(id: string): Promise<{ name: string, type: string }> {
        return fetch(`${this.getApiEndpoint()}annotations(${id})?$select=filename,mimetype`)
            .then(k => k.json())
            .then(k => { return { name: k.filename, type: k.mimetype } })
    };

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

