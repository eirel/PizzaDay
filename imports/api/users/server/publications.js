import { Meteor } from 'meteor/meteor'

Meteor.publish("users", function () {
    return Meteor.users.find({})
})

Meteor.publish("user", function (id) {
    return Meteor.users.find({ _id: id})
})
