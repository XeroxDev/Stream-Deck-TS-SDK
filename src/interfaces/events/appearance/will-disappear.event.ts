import { AcdData } from '../../acd-data';
import { WillAppearEvent } from './will-appear.event';

/**
 * Data send from the willDisappear event
 * @category Event Data
 */
export interface WillDisappearEvent<Settings = any> extends AcdData {
    event: 'willDisappear';
    payload: WillAppearEvent<Settings>['payload'];
}
