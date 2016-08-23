const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)

export const getRandomKitten = () =>
    `https://placekitten.com/${getRandomInt(400, 500)}/300`

export const onAuthCheck = (func) =>
    Meteor.userId() ? func() : Bert.alert('<p>Not authorized</p>', 'danger', 'growl-bottom-right')

export const onOwnerCheck = (owner, func) =>
    owner === Meteor.userId() ? func() : Bert.alert('<p>Not authorized</p>', 'danger', 'growl-bottom-right')

export const getUsername = (user) =>
    user ? user.profile ? user.profile.name : user.username : undefined

export const getUserPhoto = (user) =>
    user ? user.services && user.services.google ? user.services.google.picture : getRandomKitten() : undefined

export const getUserEmail = (user) =>
    user && user.services && user.services.google ? user.services.google.email : user.emails[0].address
