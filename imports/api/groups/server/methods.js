import {Meteor} from 'meteor/meteor'
import {Random} from 'meteor/random'
import Groups from '../groups'
import {onAuthCheck, onOwnerCheck, getUsername, getUserPhoto, getUserEmail} from '../../users/server/methods'
import { Email } from 'meteor/email'
import { check } from 'meteor/check'

Meteor.methods({
    addGroup: function ({name, logo}) {
        onAuthCheck(() => {
            const user = Meteor.user()
            Groups.insert({
                name: name,
                logo: logo,
                members: [{
                    id: Meteor.userId(),
                    username: getUsername(user),
                    email: getUserEmail(user),
                    photo: getUserPhoto(user),
                    isParticipant: false,
                    status: null,
                    joinedAt: new Date()
                }],
                menu: [],
                orders: [],
                owner: Meteor.userId(),
                createdAt: new Date()
            })
        })
    },

    removeGroup: function (id) {
        const group = Groups.findOne(id)

        onOwnerCheck(group.owner, () => {
            Meteor.call('removeInvitations', id)
            Meteor.call('removeEventByGroup', id)
            Groups.remove(id)
        })
    },

    addMember: function ({id, userId}) {
        onAuthCheck(() => {
            const user = Meteor.users.findOne(userId)
            Groups.update(
                {_id: id},
                {
                    $push: {
                        "members": {
                            id: userId,
                            username: getUsername(user),
                            email: getUserEmail(user),
                            photo: getUserPhoto(user),
                            isParticipant: false,
                            joinedAt: new Date()
                        }
                    }
                }
            )
        })
    },

    removeMember: function ({id, userId}) {
        onAuthCheck(() => {
            Groups.update(
                {_id: id},
                {
                    $pull: {
                        "members": {id: userId}
                    }
                }
            )
            Meteor.call('removeOrderItems', {
                id: id,
                userId: userId
            })
        })
    },

    addParticipant: function ({id, userId}) {
        onAuthCheck(() =>
            Groups.update(
                {_id: id, "members.id": userId},
                {
                    $set: {
                        "members.$.isParticipant": true,
                        "members.$.status": "ordering"
                    }
                }
            )
        )
    },

    removeParticipant: function ({id, userId}) {
        onAuthCheck(() => {
            Groups.update(
                {_id: id, "members.id": userId},
                {
                    $set: {
                        "members.$.isParticipant": false,
                        "members.$.status": null
                    }
                }
            )
            Meteor.call('removeOrderItems', {id, userId})
        })
    },

    removeParticipants: function (id) {
        onAuthCheck(() => {
            Groups.find({_id: id})
                .forEach(group => {

                    const members = _.map(group.members, member =>
                         Object.assign(member, {
                             isParticipant: false
                        })
                    )

                    Groups.update(
                        {_id: group._id},
                        {
                            $set: {
                                "members": members
                            }
                        }
                    )
                })
        })
    },

    addMenuItem: function ({id, name, price}) {
        onAuthCheck(() =>
            Groups.update(
                {_id: id},
                {
                    $push: {
                        menu: {
                            id: Random.id(),
                            name: name,
                            price: price,
                            createdAt: new Date()
                        }
                    }
                }
            )
        )
    },

    removeMenuItems: function ({id, items}) {
        onAuthCheck(() => {
            Groups.update(
                {_id: id},
                {
                    $pull: {
                        "menu": {id: {$in: items}}
                    }
                }
            )
        })
    },

    updateMenuItemPrice: function ({id, itemId, price}) {
        onAuthCheck(() =>
            Groups.update(
                {_id: id, "menu.id": itemId},
                {
                    $set: {
                        "menu.$.price": price
                    }
                }
            )
        )
    },

    updateMenuItemName: function ({id, itemId, name}) {
        onAuthCheck(() =>
            Groups.update(
                {_id: id, "menu.id": itemId},
                {
                    $set: {
                        "menu.$.name": name
                    }
                }
            )
        )
    },

    addOrderItem: function ({id, name, price, quantity}) {
        onAuthCheck(() =>
            Groups.update(
                {_id: id},
                {
                    $push: {
                        orders: {
                            id: Random.id(),
                            name: name,
                            price: price,
                            quantity: quantity,
                            orderedBy: getUsername(Meteor.user()),
                            createdAt: new Date()
                        }
                    }
                }
            )
        )
    },

    removeOrderItem: function ({id, item}) {
        onAuthCheck(() => {
            Groups.update(
                {_id: id},
                {
                    $pull: {
                        "orders": {id: item}
                    }
                }
            )
        })
    },

    removeOrderItems: function ({id, userId}) {
        onAuthCheck(() => {
            const user = Meteor.users.findOne({_id: userId})
            const orderedBy = getUsername(user)

            Groups.update(
                {_id: id},
                {
                    $pull: {
                        "orders": {"orderedBy": orderedBy}
                    }
                }
            )
        })
    },

    updateOrderItemQuantity: function ({id, item, quantity}) {
        onAuthCheck(() =>
            Groups.update(
                {_id: id, "orders.id": item},
                {
                    $set: {
                        "orders.$.quantity": quantity
                    }
                }
            )
        )
    },

    updateMemberStatus: function ({id, userId, status}) {
        onAuthCheck(() => {
            Groups.update(
                {_id: id, "members.id": userId},
                {
                    $set: {
                        "members.$.status": status
                    }
                }
            )
            Meteor.call('shouldEventUpdate', id)
        })
    },

    shouldEventUpdate: function (id) {
        const group = Groups.findOne({_id: id})
        const participants = group.members
            .filter(member => member.isParticipant)

        const should = participants
            .every(participant => participant.status === 'ordered')

        if (should) {
            Meteor.call('updateEventStatus', {
                group: id,
                status: 'ordered'
            }, () => {

                Meteor.call('sendEmail', {
                    to: 'eirelcc@gmail.com',
                    from: 'bob@example.com',
                    subject: 'Hello from Meteor!',
                    text: 'This is a test of Email.send.'
                })
            })
        }
    },

    updateOrderItemsStatus: function ({id, user, status}) {
        onAuthCheck(() => {
            const orderedBy = getUsername(user)

            Groups.find({_id: id})
                .forEach(group => {

                    const orders = _.map(group.orders, order =>
                        order.orderedBy !== orderedBy ? order : Object.assign(order, {
                            status: status
                        })
                    )

                    Groups.update(
                        {_id: group._id},
                        {
                            $set: {
                                "orders": orders
                            }
                        }
                    )
                })
        })
    },

    sendEmail: function ({to, from, subject, text}) {
        check([to, from, subject, text], [String])
        this.unblock()

        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        })
    }
})