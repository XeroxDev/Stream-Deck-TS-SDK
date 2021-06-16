import { AcdData } from '../../acd-data';
import { Coordinates } from '../../coordinates';
import { StateType } from '../../enums';
import { TitleParameters } from '../../title-parameters';

/**
 * Data send from the titleParametersDidChange event
 * @category Event Data
 */
export interface TitleParametersDidChangeEvent<Settings = any> extends AcdData {
    event: 'titleParametersDidChange';
    payload: {
        coordinates: Coordinates;
        settings: Settings;
        state: StateType;
        title: string;
        titleParameters: TitleParameters;
    };
}
