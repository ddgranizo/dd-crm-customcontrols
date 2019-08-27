import { IValue } from "./IValue";
import { ICustomProps } from "./ICustomProps";

export  interface IValuedMaksProps{
    focusHandler(): void,
    value: IValue,
    customProps: ICustomProps,
}