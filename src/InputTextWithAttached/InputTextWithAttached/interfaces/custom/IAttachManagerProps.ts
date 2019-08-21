import { IInputs } from "../../generated/ManifestTypes";

export interface IAttachManagerProps{
    annotationId: string,
    currentEntityId: string,
    context: ComponentFramework.Context<IInputs>,
    updatedHandler(annotationId: string): void,
    openConfirmDialog: Function
}