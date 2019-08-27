import * as React from 'react';
import { IResultFormulaState } from '../../interfaces/IResultFormulaState';
import { IResultFormulaProps } from '../../interfaces/IResultFormulaProps';

export class ResultFormula extends React.Component<IResultFormulaProps, IResultFormulaState> {

    constructor(props: IResultFormulaProps) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    componentWillReceiveProps(nextProps: IResultFormulaProps) {
        this.setState({ value: nextProps.value })
    }

    render() {
        const { value } = this.state;
        const { formula, name, units } = this.props
        const valueStr = value.numberValue as any;
        const replacedFormula = formula.replace(/x/g, valueStr);
        let result = "";
        let isError = false;
        try {
            result = eval(replacedFormula);
        } catch (error) {
            console.error(error)
            isError = true;
        }

        if (isError) {
            return <span className="ResultFormula-spanWrapper ResultFormula-error">Error</span>
        }
        return (
            <span className="ResultFormula-spanWrapper">{name} = {result} {units}</span>
        )
    }
}


