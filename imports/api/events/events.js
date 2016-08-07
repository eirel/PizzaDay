import {Mongo} from 'meteor/mongo'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'
import {attachSchema} from 'meteor/aldeed:collection2'

const EventSchema = new SimpleSchema({
    "date": {
        type: Date,
        label: "Event date",
        optional: false
    },
    "status": {
        type: String,
        label: "Event status",
        optional: false
    }
})

// GroupEvents = new Mongo.Collection('events')
// GroupEvents.attachSchema(EventSchema)

// export default GroupEvents

export { EventSchema }

