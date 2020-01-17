import React, { useState } from 'react'
import { render } from 'react-dom'
import { injectIntl, FormattedMessage } from 'react-intl';
import question_mark from '../../components/images/Question Mark_Icon.svg';
import IReactIntl from '../../Translations/IReactIntl';

interface IProps {
    titleKey?: string,
    contentKey?: string,
    handleConfirm?: (data: string) => void,
    handleReject?: () => void,
    intl: any
}

const QueryPopup: React.FC<IProps> = props => {
    const [value, setValue] = useState("");
    const confirm = () => {
        if (props.handleConfirm) { props.handleConfirm(`"${value}"`) }
        removeBodyClass();
    }
    const reject = () => {
        if (props.handleReject) { props.handleReject() }
        removeBodyClass();
    }
    const removeBodyClass = () => {
        document.body.classList.remove('react-confirm-alert-body-element');
        const target: any = document.getElementById('react-confirm-alert');
        target.parentNode.removeChild(target);
    }
    return (
        <div className="modal fade show custom_modal query_modal" id="queryModal" tabIndex={-1} role="dialog" aria-labelledby="queryModalLabel" data-keyboard="false" data-backdrop="static" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content d-flex align-items-center">
                    <span><img className="question_mark_icon" src={question_mark} alt="close" /></span>
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Add a Query
                        </h5>
                        <span onClick={() => removeBodyClass()} className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </span>
                    </div>
                    <div className="modal-body text-center w-100">
                        <p>Please let us know your query below</p>
                        <textarea name="projectAdditionalDetail.comments" placeholder="Type in additional comments" rows={3} className="form-control undefined " onChange={e => setValue(e.target.value)}></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" data-test="button_reject" className="" onClick={() => reject()}>
                            CANCEL
                        </button>
                        <button type="button" data-test="button_confirm" className="active" onClick={() => confirm()}>
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
function createElementQuery(properties) {
    let divTarget = document.getElementById('react-confirm-alert')
    if (divTarget) {
        render(<QueryPopup {...properties} />, divTarget)
    } else {
        if (document.body.children.length > 0) {
            document.body.children[0].classList.add('react-confirm-alert-blur')
        }
        divTarget = document.createElement('div')
        divTarget.id = 'react-confirm-alert'
        document.body.appendChild(divTarget)
        render(<QueryPopup {...properties} />, divTarget)
    }
}
export function showQueryModal(properties) {
    createElementQuery(properties)
}
export default (QueryPopup);

