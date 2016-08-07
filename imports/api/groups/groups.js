import {Mongo} from 'meteor/mongo'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'
import {attachSchema} from 'meteor/aldeed:collection2'
import { EventSchema } from '../events/events'

MenuItemSchema = new SimpleSchema({
    "name": {
        type: String,
        label: "Item name",
        optional: false
    },

    "price": {
        type: String,
        label: "Item price",
        optional: false
    },

    "createdAt": {
        type: Date,
        label: "Date of group creation",
        optional: false
    }
})


GroupSchema = new SimpleSchema({
    "name": {
        type: String,
        label: "Group name",
        optional: false
    },

    "logo": {
        type: String,
        label: "Group logo",
        optional: false
    },

    "members": {
        type: [String],
        label: "Group members"
    },

    "menu": {
        type: [MenuItemSchema],
        label: "Group items menu"
    },

    "events": {
        type: [EventSchema],
        label: "Group events"
    },

    "owner": {
        type: String,
        label: "Group owner",
        optional: false
    },

    "createdAt": {
        type: Date,
        label: "Date of group creation",
        optional: false
    }
})

Groups = new Mongo.Collection('groups')
Groups.attachSchema(GroupSchema)

export default Groups