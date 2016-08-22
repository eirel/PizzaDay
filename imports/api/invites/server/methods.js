import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import Invites from '../invites'
import {onAuthCheck} from '../../users/server/methods'

Meteor.methods({
    addInvitation: function ({ recipient, group }) {
        onAuthCheck(() =>
            Invites.insert({
                recipient: recipient,
                group: group,
                createdAt: new Date()
            })
        )
    },

    removeInvitations: function (id) {
        onAuthCheck(() =>
            Invites.remove({'group': id})
        )
    },
    
    removeInvitation: function (id) {
        onAuthCheck(() =>
            Invites.remove({'_id': id})
        )
    }
})