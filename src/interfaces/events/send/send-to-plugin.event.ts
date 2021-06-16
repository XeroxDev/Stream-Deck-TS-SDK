/**
 * Data send from the sendToPlugin event
 * @category Event Data
 */
export interface SendToPluginEvent {
    action: string;
    event: 'sendToPlugin';
    context: string;
    payload: any;
}
