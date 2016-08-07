import { Meteor } from 'meteor/meteor'
import Groups from '../groups'

Meteor.publish("groups", function () {
    return Groups.find()
})

Meteor.publish("group", function (id) {
    return Groups.find({ _id: id})
})