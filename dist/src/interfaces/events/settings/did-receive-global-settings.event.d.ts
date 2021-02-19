export interface DidReceiveGlobalSettingsEvent {
    event: 'didReceiveGlobalSettings';
    payload: {
        settings: any;
    };
}
