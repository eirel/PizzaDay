import {Mongo} from 'meteor/mongo'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'
import {attachSchema} from 'meteor/aldeed:collection2'
import { EventSchema } from '../events/events'
import { MenuItemSchema } from './menu'
import { MemberSchema } from './member'
import { OrderSchema } from './order'

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
        type: [MemberSchema],
        label: "Group members"
    },

    "menu": {
        type: [MenuItemSchema],
        label: "Group menu id"
    },

    "orders": {
        type: [OrderSchema],
        label: "Group list of orders",
        optional: true
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