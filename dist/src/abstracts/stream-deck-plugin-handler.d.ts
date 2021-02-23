import { StateType, TargetType } from "../interfaces/enums";
import { StreamDeckHandlerBase } from "./stream-deck-handler-base";
export declare abstract class StreamDeckPluginHandler<GlobalSettings = any> extends StreamDeckHandlerBase {
    private _globalSettings;
    setTitle(title: string, context: string, target?: TargetType, state?: StateType): void;
    setImage(image: string, context: string, target?: TargetType, state?: StateType): void;
    showAlert(context: string): void;
    showOk(context: string): void;
    setState(state: StateType, context: string): void;
    switchToProfile(profile: string, device?: string): void;
    sendToPropertyInspector(payload: any, action: string, context: string): void;
    private onGlobalSettings;
    get globalSettings(): any;
}
