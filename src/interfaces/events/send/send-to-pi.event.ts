/**
 * Data send from the sendToPropertyInspector event
 * @category Event Data
 */
export interface SendToPiEvent {
    action: string;
    event: 'sendToPropertyInspector';
    context: string;
    payload: any;
}
