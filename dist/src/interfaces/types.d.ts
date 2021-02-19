export declare type PossibleEventsToReceive = PossibleEventsForAllToReceive | PossibleEventsForPiToReceive | PossibleEventsForActionToReceive;
export declare type PossibleEventsForAllToReceive = 'didReceiveSettings' | 'didReceiveGlobalSettings';
export declare type PossibleEventsForPiToReceive = 'sendToPropertyInspector';
export declare type PossibleEventsForActionToReceive = 'keyDown' | 'keyUp' | 'willAppear' | 'willDisappear' | 'titleParametersDidChange' | 'deviceDidConnect' | 'deviceDidDisconnect' | 'applicationDidLaunch' | 'applicationDidTerminate' | 'systemDidWakeUp' | 'propertyInspectorDidAppear' | 'propertyInspectorDidDisappear' | 'sendToPlugin';
export declare type PossibleEventsToSend = PossibleEventsForPiToSend | PossibleEventsForAllToSend | PossibleEventsForActionToSend | string;
export declare type PossibleEventsForAllToSend = 'setSettings' | 'getSettings' | 'setGlobalSettings' | 'getGlobalSettings';
export declare type PossibleEventsForPiToSend = 'sendToPlugin';
export declare type PossibleEventsForActionToSend = 'openUrl' | 'logMessage' | 'setTitle' | 'setImage' | 'showAlert' | 'showOk' | 'setState' | 'switchToProfile' | 'sendToPropertyInspector';
