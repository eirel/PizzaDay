import { Meteor } from 'meteor/meteor'
import Invites from '../invites'

Meteor.publish("invites", function (id) {
    return Invites.find({'recipient': id})
})