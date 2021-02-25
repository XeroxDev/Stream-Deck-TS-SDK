import {AcdData} from '../../acd-data';

/**
 * Data send from the propertyInspectorDidAppear event
 * @category Event Data
 */
export interface PropertyInspectorDidAppearEvent extends AcdData {
    event: 'propertyInspectorDidAppear'
}
