export default interface IAnnotationDataAccess{
    entityHasAnnotations : Function
    existsAnnotation : Function,
    uploadFile: Function,
    getAnnotationInfo: Function,
    deleteAnnotation: Function,
    getAnnotationContent: Function
}