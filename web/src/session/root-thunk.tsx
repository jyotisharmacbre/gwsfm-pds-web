import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export type RootState = {};
export type ExtraArg = undefined;
export type ThunkResult<R> = ThunkAction<R, RootState, ExtraArg, Action>;
export type ThunkDispatch = ThunkDispatch<RootState, ExtraArg, Action>;