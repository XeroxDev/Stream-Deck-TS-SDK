import {AcdData}      from '../../acd-data';
import {KeyDownEvent} from './key-down.event';

export interface KeyUpEvent<Settings = any> extends AcdData {
    event: 'keyUp',
    payload: KeyDownEvent<Settings>['payload']
}
