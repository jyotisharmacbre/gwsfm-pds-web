import React from 'react';
import { Field, reduxForm, InjectedFormProps,reset } from 'redux-form';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import { Validate, alphaNumeric, onlyNumber, OnlyDistinctAssetTypes } from '../../../helpers/fieldValidations';
import {IPostCommentForm} from './IPostCommentForm';
import { FormattedMessage } from 'react-intl';

interface Props {
	postComment:(data:IPostCommentForm) => void;
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('PostCommentForm'));

const PostCommentForm = (props:Props & InjectedFormProps<IPostCommentForm,Props>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field 
                data-test='comment-text'
                name="comment"
                rows="3"
                component={PdsFormTextArea}
                validate={[Validate.maxLength(5000)]}
                placeholderKey="LABEL_ADD_YOUR_COMMENT_HERE"
                />
            <button type="submit" disabled={props.pristine || props.submitting} onClick={props.handleSubmit((values:IPostCommentForm) => props.postComment(values))}>
             <FormattedMessage id='LABEL_POST_COMMENT' />
            </button>
        </form>          
	);
};


const form = reduxForm<IPostCommentForm,Props>({
	form: 'PostCommentForm',
    onSubmitSuccess: afterSubmit,
})(PostCommentForm);

export default form;
