import IAnnotationAccessData from './../interfaces/IAnnotationDataAccess'
import { IInputs } from '../generated/ManifestTypes';

export default class AnnotationAccessDataService implements IAnnotationAccessData {

    _context: ComponentFramework.Context<IInputs>;
    _currentEntity: string;
    _currentId: string;
    _annotationEntityName: string;
    constructor(context: ComponentFramework.Context<IInputs>) {
        this._context = context
        this._currentEntity = (this._context.client as any).page.entityTypeName
        this._currentId = (this._context.client as any).page.entityId
        this._annotationEntityName = "annotation";
    }


    async getAnnotationContent(id: string): Promise<string> {
        return this._context.webAPI.retrieveRecord(this._annotationEntityName, id, "$select=documentbody")
            .then(k => k.documentbody)
    }

    async deleteAnnotation(id: string): Promise<void> {
        return this._context.webAPI.deleteRecord("annotation", id)
            .then(k => { })
    }

    async entityHasAnnotations(): Promise<boolean> {
        return this._context.utils.getEntityMetadata(this._currentEntity)
            .then(k => { return k.IsDocumentManagementEnabled });
    }


    async existsAnnotation(id: string): Promise<boolean> {
        return this._context.webAPI.retrieveMultipleRecords("annotation", `$select=annotationid&$filter=annotationid eq (${id})`)
            .then(k => k.entities.length > 0);
    }


    async uploadFile(name: string, type: string, content: string): Promise<string> {
        const bindPlace = `objectid_${this._currentEntity}@odata.bind`
        let annotation: { [k: string]: any } = {
            isdocument: true,
            subject: name,
            objecttypecode: this._currentEntity,
            mimetype: type,
            documentbody: content,
            filename: name,
            notetext: name
        }
        return this._context.utils.getEntityMetadata(this._currentEntity)
            .then(entityMetadata => {
                const setName = entityMetadata.EntitySetName
                annotation[bindPlace] = `/${setName}(${this._currentId}})`
                return this._context.webAPI.createRecord("annotation", annotation)
            })
            .then(k => k.id)

    };

    async getAnnotationInfo(id: string): Promise<{ name: string, type: string }> {
        return this._context.webAPI.retrieveRecord(this._annotationEntityName, id, "$select=filename,mimetype")
            .then(k =>{return {name: k.filename, type: k.mimetype}} )
    };


}