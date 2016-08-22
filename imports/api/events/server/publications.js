import { Meteor } from 'meteor/meteor'
import Events from '../events'

Meteor.publish("events", function () {
    return Events.find()
})

Meteor.publish("event", function (id) {
    return Events.find({ group: id})
})