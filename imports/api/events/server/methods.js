import {Meteor} from 'meteor/meteor'
import {Random} from 'meteor/random'
import Events from '../events'
import {onAuthCheck} from '../../users/server/methods'

Meteor.methods({
    addEvent: function ({name, date, group}) {
        return onAuthCheck(() =>
            Events.insert({
                name,
                date,
                group,
                status: 'ordering',
                createdAt: new Date()
            })
        )
    },

    removeEvent: function (id) {
        Events.remove(id)
    },

    removeEventByGroup: function (id) {
        Events.remove({group: id})
    },

    updateEventStatus: function ({group, status}) {
        onAuthCheck(() => {
            Events.update(
                {group: group},
                {
                    $set: {
                        "status": status
                    }
                }
            )
        })
    }
})