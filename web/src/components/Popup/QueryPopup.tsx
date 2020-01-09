import React from 'react'
import { render } from 'react-dom'
import { injectIntl, FormattedMessage } from 'react-intl';
import question_mark from '../../components/images/Question Mark_Icon.svg';

interface IProps {
    titleKey?: string,
    contentKey?: string,
    handleConfirm?: () => void,
    handleReject?: () => void
}

const QueryPopup: React.FC<IProps> = props => {
    const confirm = () => {
        if (props.handleConfirm) { props.handleConfirm() }
        removeBodyClass();
    }
    const reject = () => {
        if (props.handleReject) { props.handleReject() }
        removeBodyClass();
    }
    const removeBodyClass = () => {
        const target: any = document.getElementById('exampleModal')
        target.parentNode.removeChild(target)
    }
    return (
        <div className="modal fade show custom_modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" data-keyboard="false" data-backdrop="static" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <span><img src={question_mark} alt="close" /></span>
                    <div className="modal-header">
                        <h5 className="modal-title">
                           heading
                        </h5>
                        <span onClick={() => removeBodyClass()} className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </span>
                    </div>
                    <div className="modal-body">
                        heading body
                    </div>
                    <div className="modal-footer">
                        <button type="button" data-test="button_reject" className="" onClick={() => reject()}>
                           no
                        </button>
                        <button type="button" data-test="button_confirm" className="active" onClick={() => confirm()}>
                        yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QueryPopup;

