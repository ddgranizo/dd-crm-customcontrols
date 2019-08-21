export interface IAnnotationDataAccess {
    entityHasAnnotations(): Promise<boolean>,
    existsAnnotation(id: string): Promise<boolean>,
    uploadFile(currentEntityId: string, name: string, type: string, content: string): Promise<string>,
    getAnnotationInfo(id: string): Promise<{ name: string, type: string }>,
    deleteAnnotation(id: string): Promise<void>,
    getAnnotationContent(id: string): Promise<string>,
    isCreationMode(): boolean
}