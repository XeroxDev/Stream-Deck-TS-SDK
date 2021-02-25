import {AcdData}     from '../../acd-data';
import {Coordinates} from '../../coordinates';
import {StateType}   from '../../enums';

/**
 * Data send from the keyDown event
 * @category Event Data
 */
export interface KeyDownEvent<Settings = any> extends AcdData {
    event: 'keyDown'
    payload: {
        settings: Settings,
        coordinates: Coordinates,
        state: StateType,
        userDesiredState: StateType,
        isInMultiAction: boolean
    }
}
