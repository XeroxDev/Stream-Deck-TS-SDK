import { AcdData } from '../../acd-data';
import { KeyDownEvent } from './key-down.event';

/**
 * Data send from the keyUp event
 * @category Event Data
 */
export interface KeyUpEvent<Settings = any> extends AcdData {
    event: 'keyUp';
    payload: KeyDownEvent<Settings>['payload'];
}
