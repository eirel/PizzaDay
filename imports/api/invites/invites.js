import {Mongo} from 'meteor/mongo'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'
import {attachSchema} from 'meteor/aldeed:collection2'

InviteSchema = new SimpleSchema({
    "recipient": {
        type: String,
        label: "Recipient ID",
        optional: false
    },

    "group": {
        type: String,
        label: "Group ID",
        optional: false
    },

    "createdAt": {
        type: Date,
        label: "Date of invite creation",
        optional: false
    }
})

Invites = new Mongo.Collection('invites')
Invites.attachSchema(InviteSchema)

export default Invites