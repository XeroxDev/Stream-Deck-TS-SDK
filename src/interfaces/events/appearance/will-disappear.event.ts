import {AcdData}         from '../../acd-data';
import {WillAppearEvent} from './will-appear.event';

export interface WillDisappearEvent<Settings = any> extends AcdData {
    event: 'willDisappear',
    payload: WillAppearEvent<Settings>['payload']
}
