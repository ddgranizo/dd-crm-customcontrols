import { IValue } from "./IValue";
import { ICustomProps } from "./ICustomProps";

export interface IEditingComponentProps {
    updatedHandler(value: IValue): void,
    commitedValueHandler(value: IValue): void,
    lostFocusHandler(): void,
    customProps: ICustomProps,
    value: IValue,
}