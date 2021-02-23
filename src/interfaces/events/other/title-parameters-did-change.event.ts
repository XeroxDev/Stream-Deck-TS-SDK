import {AcdData} from "../../acd-data";
import {Coordinates} from "../../coordinates";
import {TitleParameters} from "../../title-parameters";
import {StateType} from "../../enums";

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
