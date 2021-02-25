import {AcdData}         from '../../acd-data';
import {Coordinates}     from '../../coordinates';
import {StateType}       from '../../enums';
import {TitleParameters} from '../../title-parameters';

export interface TitleParametersDidChangeEvent<Settings = any> extends AcdData {
    event: 'titleParametersDidChange',
    payload: {
        coordinates: Coordinates,
        settings: Settings,
        state: StateType,
        title: string,
        titleParameters: TitleParameters
    }
}
