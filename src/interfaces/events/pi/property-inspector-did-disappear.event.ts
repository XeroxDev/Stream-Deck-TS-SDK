import { AcdData } from '../../acd-data';

/**
 * Data send from the propertyInspectorDidDisappear event
 * @category Event Data
 */
export interface PropertyInspectorDidDisappearEvent extends AcdData {
    event: 'propertyInspectorDidDisappear';
}
