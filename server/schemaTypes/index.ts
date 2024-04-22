import {artistType} from './artistType'
import {eventType} from './eventType'
import {venueType} from './venueType'

import {productRegistrationType} from './products/registration'

const eventsGroup = [eventType, artistType, venueType]
const productGroup = [productRegistrationType]
export const schemaTypes = [...eventsGroup, ...productGroup]
