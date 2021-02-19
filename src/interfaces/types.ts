export type PossibleEventsToReceive =
	PossibleEventsForAllToReceive
	| PossibleEventsForPiToReceive
	| PossibleEventsForActionToReceive;

export type PossibleEventsForAllToReceive = 'didReceiveSettings' | 'didReceiveGlobalSettings';

export type PossibleEventsForPiToReceive = 'sendToPropertyInspector';

export type PossibleEventsForActionToReceive =
	'keyDown'
	| 'keyUp'
	| 'willAppear'
	| 'willDisappear'
	| 'titleParametersDidChange'
	| 'deviceDidConnect'
	| 'deviceDidDisconnect'
	| 'applicationDidLaunch'
	| 'applicationDidTerminate'
	| 'systemDidWakeUp'
	| 'propertyInspectorDidAppear'
	| 'propertyInspectorDidDisappear'
	| 'sendToPlugin';

export type PossibleEventsToSend =
	PossibleEventsForPiToSend
	| PossibleEventsForAllToSend
	| PossibleEventsForActionToSend
	| string;

export type PossibleEventsForAllToSend =
	'setSettings' |
	'getSettings' |
	'setGlobalSettings' |
	'getGlobalSettings';

export type PossibleEventsForPiToSend = 'sendToPlugin';

export type PossibleEventsForActionToSend =
	'openUrl' |
	'logMessage' |
	'setTitle' |
	'setImage' |
	'showAlert' |
	'showOk' |
	'setState' |
	'switchToProfile' |
	'sendToPropertyInspector';
