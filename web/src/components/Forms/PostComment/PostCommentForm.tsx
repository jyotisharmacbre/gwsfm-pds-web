import React from 'react';
import { Field, reduxForm, InjectedFormProps,reset } from 'redux-form';
import PdsFormTextArea from '../../PdsFormHandlers/PdsFormTextArea';
import { Validate, alphaNumeric, onlyNumber, OnlyDistinctAssetTypes } from '../../../helpers/fieldValidations';
import {IPostCommentForm} from './IPostCommentForm';

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
                placeholderKey="Add your comment here"
                />
            <button type="submit" disabled={props.pristine || props.submitting} onClick={props.handleSubmit((values:IPostCommentForm) => props.postComment(values))}>
            Post Comment
            </button>
        </form>          
	);
};

const form = reduxForm<IPostCommentForm,Props>({
	form: 'PostCommentForm',
    onSubmitSuccess: afterSubmit,
})(PostCommentForm);

export default form;
