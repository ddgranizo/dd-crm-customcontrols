import { IValue } from "./IValue";
import { ICustomProps } from "./ICustomProps";

export  interface IValuedMaskProps{
    focusHandler(): void,
    value: IValue,
    customProps: ICustomProps,
}