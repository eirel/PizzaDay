import {Meteor} from 'meteor/meteor'
import Groups from '../groups'

export const getGroups = () => ({
    type: 'GET_GROUPS',
    groups: Groups.find().fetch()
})

export const addGroup = ({name, logo}) => (dispatch) => {
    const group = {
        name: name,
        logo: logo,
        members: [Meteor.userId()],
        menu: [],
        events: [],
        owner: Meteor.userId(),
        createdAt: new Date()
    }
    Meteor.call('addGroup', group, err => {
        if (err) {
            dispatch({
                type: 'ADD_GROUP_ERROR',
                err
            })
        } else {
            dispatch({
                type: 'ADD_GROUP',
                group
            })
        }
    })
}