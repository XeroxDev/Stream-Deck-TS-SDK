export interface DidReceiveGlobalSettingsEvent<Settings = any> {
	event: 'didReceiveGlobalSettings',
	payload: {
		settings: Settings
	}
}
