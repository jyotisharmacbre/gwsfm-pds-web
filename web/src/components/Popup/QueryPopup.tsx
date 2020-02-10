import React, { useState } from 'react'
import { render } from 'react-dom'
import { injectIntl, FormattedMessage } from 'react-intl';
import question_mark from '../../components/images/Question Mark_Icon.svg';
import IReactIntl from '../../Translations/IReactIntl';
import { formatMessage } from '../../Translations/connectedIntlProvider';
import warn_icon from '../../components/images/warn_icon.svg';

interface IProps {
    intl: any,
    titleKey?: any,
    subTitleKey?: any,
    contentKey?: any,
    handleConfirm?: (data: string) => void,
    handleCancel?: () => void
}

const QueryPopup: React.FC<IProps> = props => {
    const [value, setValue] = useState("");
    const confirm = () => {
        if (props.handleConfirm) { props.handleConfirm(`"${value}"`) }
        removeBodyClass();
    }
    const cancel = () => { 
        if (props.handleCancel) { props.handleCancel() ;}    }
    const removeBodyClass = () => {
        const target: any = document.getElementById('exampleModal')
        target.parentNode.removeChild(target)
    }
    return (
        <div className="modal fade show custom_modal query_modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" data-keyboard="false" data-backdrop="static" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" id="innerQueryModal" role="document">
                <div className="modal-content d-flex align-items-center">
                    <span><img className="question_mark_icon" src={question_mark} alt="close" /></span>
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {props.titleKey}
                        </h5>
                        <span onClick={() => cancel()} className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </span>
                    </div>
                    <div className="modal-body text-center w-100">
                        <p>{props.subTitleKey}</p>
                        <textarea name="projectAdditionalDetail.comments" placeholder={formatMessage("PLACEHOLDER_QUERY")} rows={3} className="form-control undefined " onChange={e => setValue(e.target.value)}></textarea>
                        <p className="warn_msg">
                            <img className="warn_icon" src={warn_icon} alt="close" />
                            <i><FormattedMessage id="MESSAGE_WARNING" /></i>
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" data-test="button_reject" className="" onClick={() => cancel()}>
                            {formatMessage("BUTTON_CANCEL")}
                        </button>
                        <button type="button" data-test="button_confirm" id="button_confirm" className="active" onClick={() => confirm()}>
                            {formatMessage("BUTTON_SUBMIT")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QueryPopup;

