import {Mongo} from 'meteor/mongo'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'
import {attachSchema} from 'meteor/aldeed:collection2'

const EventSchema = new SimpleSchema({
    "name": {
        type: String,
        label: "Event name",
        optional: false
    },

    "date": {
        type: Date,
        label: "Event date",
        optional: false
    },

    "group": {
        type: String,
        label: "User's group that takes part in Event",
        optional: false
    },

    "status": {
        type: String,
        label: "Event status(ordering/ordered/delivering/delivered)",
        optional: false
    },

    "createdAt": {
        type: Date,
        label: "Date of group creation",
        optional: false
    }
})

const Events = new Mongo.Collection('events')
Events.attachSchema(EventSchema)

export default Events
