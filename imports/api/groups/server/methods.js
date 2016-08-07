import { Meteor } from 'meteor/meteor'
import Groups from '../groups'

Meteor.methods({

    addGroup: function (group) {
        if (!Meteor.userId()) {
            Bert.alert( '<p>Not authorized</p>', 'danger', 'growl-bottom-right' )
        }
        Groups.insert(group)
    },

    addMenuItem: function ({id, name, price}) {
        if (!Meteor.userId()) {
            Bert.alert( '<p>Not authorized</p>', 'danger', 'growl-bottom-right' )
        }
        Groups.update(id, {
            $set: {
                menu: [
                    {
                        name: name,
                        price: price
                    }
                ]
            }
        })

        // Groups.insert({
        //     name: name,
        //     logo: logo,
        //     owner: Meteor.userId(),
        //     createdAt: new Date()
        // })
    },

    // deleteResolution: function (id) {
    //     const res = Resolutions.findOne(id)
    //     // if (res.owner !== Meteor.userId()) {
    //     //     throw new Meteor.Error('Not authorized')
    //     // }
    //     Resolutions.remove(id)
    // }

    // toggleResolution: function (id, checked) {
    //     var res = Resolutions.findOne(id)
    //
    //     if (res.owner !== Meteor.userId()) {
    //         throw new Meteor.Error('Not authorized')
    //     }
    //
    //     Resolutions.update(id, {
    //         $set: {checked: checked}
    //     })
    // },
    // setPrivate: function (id, private) {
    //     var res = Resolutions.findOne(id)
    //
    //     if (res.owner !== Meteor.userId()) {
    //         throw new Meteor.Error('Not authorized')
    //     }
    //     Resolutions.update(id, {$set: {private: private}})
    // }
})