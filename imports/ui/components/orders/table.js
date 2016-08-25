import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableFooter, TableRowColumn} from 'material-ui/Table'
import OrderItem from './item'
import RaisedButton from 'material-ui/RaisedButton'
import {composeWithTracker} from 'react-komposer'

const styles = {
    table: {
        backgroundColor: 'transparent'
    },
    footer: {
        display: 'inline-block',
        textAlign: 'right',
        margin: '0 40px 0 0'
    }
}

const calcTotal = (orders) =>
    orders.reduce((prev, cur) =>
        prev + Number((cur.price * cur.quantity - (~~cur.discount ? (~~cur.discount / 100 * cur.price) : 0)).toFixed(2))
    , 0)


const toggleOrderStatus = (id, status) => {
    const update = status === 'ordering' ? 'ordered' : 'ordering'

    Meteor.call('updateMemberStatus', {
        id,
        userId: Meteor.userId(),
        status: update
    })

     Meteor.call('updateOrderItemsStatus', {
        id,
        user: Meteor.user(),
        status: update
    })

}

const OrderTable = ({id, orders, status, isParticipant, isOrdered, isGroupOwner}) => {
    return (
        <Table
            selectable={false}
            multiSelectable={false}
            enableSelectAll={false}
            showCheckboxes={false}
            style={styles.table}
            className='orders__table'
        >
            <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}
            >
                <TableRow>
                    <TableHeaderColumn style={{width: '5%'}} tooltip={"Order №"}>#</TableHeaderColumn>
                    <TableHeaderColumn style={{width: '20%'}} tooltip={"Order name"}>Name</TableHeaderColumn>
                    <TableHeaderColumn style={{width: '10%'}} tooltip={"Order price"}>Price</TableHeaderColumn>
                    <TableHeaderColumn style={{width: '20%', textAlign: 'center'}} tooltip={"Orders quantity"}>Quantity</TableHeaderColumn>
                    <TableHeaderColumn style={{width: '10%', textAlign: 'center'}} tooltip={"Order discount"}>Discount</TableHeaderColumn>
                    <TableHeaderColumn style={{width: '10%'}} tooltip={"Order subtotal"}>Subtotal</TableHeaderColumn>
                    <TableHeaderColumn style={{width: '20%'}} tooltip={"Ordered by"}>Ordered by</TableHeaderColumn>
                    <TableHeaderColumn style={{width: '10%'}} tooltip={"Order Status"}>Status</TableHeaderColumn>
                    <TableHeaderColumn style={{width: '5%'}}></TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                showRowHover={true}
                displayRowCheckbox={false}
                className='orders__body'
            >
                {
                    orders &&
                    orders.map((item, index) =>
                        <OrderItem
                            key={item.id}
                            groupId={id}
                            index={index}
                            isParticipant={isParticipant}
                            isGroupOwner={isGroupOwner}
                            {...item}
                        />
                    )
                }

            </TableBody>
            <TableFooter
                className="orders__footer"
            >
                <TableRow>
                    <TableRowColumn colSpan="12" style={{textAlign: 'center'}}>
                        <div className="flex--end flex--nowrap" style={{padding: '30px 0 10px'}}>
                            <h2 style={styles.footer}>
                               Total: <i>{calcTotal(orders)}$</i>
                            </h2>
                            {
                                isParticipant &&
                                <RaisedButton
                                    label={isOrdered ? 'Continue ordering' : 'Finish ordering'}
                                    labelPosition="before"
                                    secondary={!isOrdered}
                                    onTouchTap={() => toggleOrderStatus(id, status)}
                                />
                            }
                        </div>
                    </TableRowColumn>
                </TableRow>
            </TableFooter>
        </Table>
    )
}


function composer({members}, onData) {
    const member = members.find(member => member.id === Meteor.userId())
    const status = member ? member.status : 'ordering'
    const isOrdered = status === 'ordered'
    onData(null, {status, isOrdered})
}

export default composeWithTracker(composer)(OrderTable)