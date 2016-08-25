import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export const OrderSchema = new SimpleSchema({
    "id": {
        type: String,
        label: "Order id",
        optional: false
    },

    "name": {
        type: String,
        label: "Order name",
        optional: false
    },

    "price": {
        type: String,
        label: "Order price",
        optional: false
    },

    "quantity": {
        type: Number,
        label: "Orders quantity",
        optional: false
    },

    "orderedBy": {
        type: String,
        label: "Who ordered the item",
        optional: false
    },

    "status": {
        type: String,
        label: "Order item status",
        optional: true
    },
    
    "createdAt": {
        type: Date,
        label: "Date of group creation",
        optional: false
    }
})