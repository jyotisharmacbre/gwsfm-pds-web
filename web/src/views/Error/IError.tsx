import { History, Location } from 'history';
import ErrorType from '../../enums/ErrorType';

export default interface IError {
    history: History;
    location: Location
    type: ErrorType
}