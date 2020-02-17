import React from 'react';
import { Field, reduxForm, InjectedFormProps, reset } from 'redux-form';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import { Validate, alphaNumeric, onlyNumber, OnlyDistinctAssetTypes } from '../../../helpers/fieldValidations';
import { IPostCommentForm } from './IPostCommentForm';
import { FormattedMessage } from 'react-intl';
import EventType from '../../../enums/EventType';
import { CircularProgress } from '@material-ui/core';

interface Props {
    postComment: (data: IPostCommentForm) => void;
    loading: boolean;
}

const afterSubmit = (result, dispatch) =>
    dispatch(reset('PostCommentForm'));

const PostCommentForm = (props: Props & InjectedFormProps<IPostCommentForm, Props>) => {
    return (
        <form className="bg-white" onSubmit={props.handleSubmit}>
            <div className="px-4 pt-4 pb-0">
                <Field
                    data-test='comment-text'
                    name="comment"
                    rows="5"
                    component={PdsFormTextArea}
                    validate={[Validate.maxLength(5000)]}
                    placeholderKey="LABEL_ADD_YOUR_COMMENT_HERE"
                />
            </div>
            <div className="text-right">
                <button type="submit" className="pds_button_align mr-4 mb-4" disabled={props.pristine || props.submitting || props.loading} onClick={props.handleSubmit((values: IPostCommentForm) => props.postComment(values))}>
                    {props.loading && <CircularProgress />}
                    <FormattedMessage id='LABEL_POST_COMMENT' />
                </button>
            </div>
        </form>
    );
};


const form = reduxForm<IPostCommentForm, Props>({
    form: 'PostCommentForm',
    onSubmitSuccess: afterSubmit,
})(PostCommentForm);

export default form;
