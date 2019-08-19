import { IValue } from "./IValue";
import { ICustomProps } from "./ICustomProps";

export  interface IValuedNoOverMaskProps{
    focusHandler(): void,
    overHandler(): void,
    value: IValue,
    customProps: ICustomProps,
}