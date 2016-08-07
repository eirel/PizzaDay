import React from 'react'
import AddItem from './add'
import MenuList from './list'

const onItemAdd = (id) => (event) => {
    event.preventDefault()

    Meteor.call('addMenuItem', {
        id: id,
        name: event.target.name.value,
        price: event.target.price.value
    })

    event.target.name.value = ''
    event.target.price.value = ''
}

const Menu = ({ id }) => (
    <div className="tearsheet wide">
        <AddItem onItemAdd={onItemAdd(id)} />
        <MenuList />
    </div>
)

export { Menu }