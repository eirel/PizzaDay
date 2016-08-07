import React from 'react'

const MenuItem = ({name, price, quantity = 1}) => (
    <li>
        <div className="name">{name}</div>
        <div className="price">{name}</div>
        <div className="quantity">{quantity}</div>
    </li>
)

export default MenuItem