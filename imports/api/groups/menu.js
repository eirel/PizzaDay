import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export const MenuItemSchema = new SimpleSchema({
    "id": {
        type: String,
        label: "Item id",
        optional: false
    },

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
