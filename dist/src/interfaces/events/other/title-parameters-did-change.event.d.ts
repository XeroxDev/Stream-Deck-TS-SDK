import { AcdData } from "../../acd-data";
import { Coordinates } from "../../coordinates";
import { TitleParameters } from "../../title-parameters";
import { StateType } from "../../enums";
export interface TitleParametersDidChangeEvent extends AcdData {
    event: 'titleParametersDidChange';
    payload: {
        coordinates: Coordinates;
        settings: any;
        state: StateType;
        title: string;
        titleParameters: TitleParameters;
    };
}
