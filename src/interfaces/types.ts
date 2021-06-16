/**
 * All possible events to receive
 */
export type PossibleEventsToReceive =
    | PossibleEventsForAllToReceive
    | PossibleEventsForPiToReceive
    | PossibleEventsForActionToReceive
    | string;

/**
 * All events available for PI and action to receive
 */
export type PossibleEventsForAllToReceive =
    | 'didReceiveSettings'
    | 'didReceiveGlobalSettings'
    | 'connectionOpened'
    | 'documentLoaded'
    | 'globalSettingsAvailable'
    | 'setupReady'
    | 'connectionClosed';

/**
 * All available events only for property inspector to receive
 */
export type PossibleEventsForPiToReceive =
    | 'sendToPropertyInspector'
    | 'registerPi'
    | PossibleEventsForAllToReceive;

/**
 * All available events only for action to receive
 */
export type PossibleEventsForActionToReceive =
    | 'keyDown'
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
    | 'sendToPlugin'
    | PossibleEventsForAllToReceive;

/**
 * All possible events to send
 */
export type PossibleEventsToSend =
    | PossibleEventsForPiToSend
    | PossibleEventsForAllToSend
    | PossibleEventsForActionToSend
    | string;

/**
 * All possible events for PI and action to send
 */
export type PossibleEventsForAllToSend =
    | 'setSettings'
    | 'getSettings'
    | 'setGlobalSettings'
    | 'getGlobalSettings';

/**
 * All possible events to send for PI
 */
export type PossibleEventsForPiToSend = 'sendToPlugin';

/**
 * All possible events to send for actions
 */
export type PossibleEventsForActionToSend =
    | 'openUrl'
    | 'logMessage'
    | 'setTitle'
    | 'setImage'
    | 'showAlert'
    | 'showOk'
    | 'setState'
    | 'switchToProfile'
    | 'sendToPropertyInspector';
