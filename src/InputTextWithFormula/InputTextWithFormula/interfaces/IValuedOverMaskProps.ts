import { IValue } from "./IValue";
import { ICustomProps } from "./ICustomProps";

export  interface IValuedOverMaskProps{
    focusHandler(): void,
    leaveHandler(): void,
    customProps: ICustomProps,
    value: IValue,
}