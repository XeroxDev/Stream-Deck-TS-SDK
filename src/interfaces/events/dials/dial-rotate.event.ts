import { AcdData } from '../../acd-data';
import { Coordinates } from '../../coordinates';
import { StateType } from '../../enums';

/**
 * Data send from the dialRotate event
 * @category Event Data
 */
export interface DialRotateEvent<Settings = any> extends AcdData {
    event: 'dialRotate';
    payload: {
        settings: Settings;
        coordinates: Coordinates;
        state: StateType;
        userDesiredState: StateType;
        isInMultiAction: boolean;
        pressed: boolean;
        ticks: number;
    };
}
