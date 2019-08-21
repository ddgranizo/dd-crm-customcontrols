export interface IAttachManagerState{
    annotationId: string,
    loading: boolean,
    entityHasAnnotations: boolean,
    existsAnnotation: boolean,
    validAnnotation: boolean,
    isCreationMode: boolean,
    annotationInfo: { name: string, type: string },
}