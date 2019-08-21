import { IInputs } from "../generated/ManifestTypes";

export default interface IReactWrapperProps{
    value: string,
    handlerChange: Function,
    openConfirmDialog : Function,
    context: ComponentFramework.Context<IInputs>,
}