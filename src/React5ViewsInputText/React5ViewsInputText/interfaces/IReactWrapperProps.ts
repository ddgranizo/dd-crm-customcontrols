import { ICustomProps } from "./ICustomProps";
import { IValue } from "./IValue";

export  interface IReactWrapperProps{
    value: IValue,
    handlerChange ( value: IValue): void,
    customProps: ICustomProps
}