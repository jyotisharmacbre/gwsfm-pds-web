import React from 'react'
import { render } from 'react-dom'
import IReactIntl from '../../Translations/IReactIntl';
import { injectIntl, FormattedMessage } from 'react-intl';

interface IProps {
    intl: any,
    titleKey: string,
    contentKey: string,
    handleConfirm: () => void,
    handleReject?: () => void
}

const QueryPopup: React.FC<IProps & IReactIntl> = props => {
    const confirm = () => {
        if (props.handleConfirm) { props.handleConfirm() }
        removeBodyClass();
    }
    const reject = () => {
        if (props.handleReject) { props.handleReject() }
        removeBodyClass();
    }
    const removeBodyClass = () => {
        document.body.classList.remove('react-confirm-alert-body-element');
        const target: any = document.getElementById('react-confirm-alert')
        target.parentNode.removeChild(target)
    }
    return (
        <div className="modal fade show custom_modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" data-keyboard="false" data-backdrop="static" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
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

function createElementReconfirm(properties) {
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

export function confirmQuery(properties) {
    debugger;
    createElementReconfirm(properties)
}
export default (QueryPopup);

