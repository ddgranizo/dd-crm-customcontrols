import * as React from 'react';
import { IIsValidPatternProps } from '../../interfaces/custom/IIsValidPatternProps';
import { IIsValidPatternState } from '../../interfaces/custom/IIsValidPatternState';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export class IsValidPattern extends React.Component<IIsValidPatternProps, IIsValidPatternState> {

    constructor(props: IIsValidPatternProps) {
        super(props);
        this.state = {
            isValid: this.isValid(props.text, props.pattern)
        }
    }

    isValid(text: string, pattern: RegExp) {
        return text == null || text == "" || pattern.test(text)
    }

    render() {

        const { isValid } = this.state;

        if (isValid) {
            return <span ><FaCheckCircle className="ReactWrapper-isValid" /></span>
        }
        return <span >
            <OverlayTrigger
                placement="left"
                key="tooltip"
                overlay={
                    <Tooltip id="leftTooltip">
                        <div className="ReactWrapper-tooltipContainer">{this.props.errorMessage}</div>
                    </Tooltip>
                }>
                <FaTimesCircle className="ReactWrapper-isNotValid" />
            </OverlayTrigger>
        </span>
    }
}


