import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export const MemberSchema = new SimpleSchema({
    "id": {
        type: String,
        label: "Member id",
        optional: false
    },

    "username": {
        type: String,
        label: "Member name",
        optional: false
    },

    "photo": {
        type: String,
        label: "Member photo",
        optional: true
    },

    "isParticipant": {
        type: Boolean,
        label: "Is participating in group event",
        optional: true
    },

    "status": {
        type: String,
        label: "Ordering status",
        optional: true
    },

    "joinedAt": {
        type: Date,
        label: "Date of joining to group",
        optional: false
    }
})
