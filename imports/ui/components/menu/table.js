import React, {Component} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { MenuTableItem } from './item'
import {composeWithTracker} from 'react-komposer'

const styles = {
    table: {
        backgroundColor: 'transparent'
    }
}

const mapItemsToProps = (rows, mappings) =>
    rows === 'all' ? mappings :
        rows === 'none' ? [] :
            rows.map(row => mappings[row])

const onDelete = (id, items) =>
    Meteor.call('removeMenuItems', {id, items})

const MenuTable = ({id, menu, mappings, blacklist, isMember}) => {
    return (
        <Table
            selectable={true}
            multiSelectable={true}
            style={styles.table}
            onRowSelection={rows => blacklist = mapItemsToProps(rows, mappings)}
        >
            <TableHeader
                displaySelectAll={isMember}
                adjustForCheckbox={isMember}
                enableSelectAll={menu.length ? true : false}
            >
                <TableRow>
                    <TableHeaderColumn style={{width: '10%'}} tooltip={"Item №"}>#</TableHeaderColumn>
                    <TableHeaderColumn style={{width: '35%'}} tooltip={"Item name"}>Name</TableHeaderColumn>
                    <TableHeaderColumn style={{width: '15%'}} tooltip={"Item price"}>Price</TableHeaderColumn>
                    {
                        isMember &&
                        <TableHeaderColumn style={{width: '15%', padding: 0, textAlign: 'center'}}>
                            <IconMenu
                                iconButtonElement={
                              <IconButton><MoreVertIcon /></IconButton>
                            }
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                                <MenuItem primaryText="Delete" onClick={() => onDelete(id, blacklist)} />
                            </IconMenu>
                        </TableHeaderColumn>
                    }
                </TableRow>
            </TableHeader>
            <TableBody
                showRowHover={true}
                deselectOnClickaway={false}
                displayRowCheckbox={isMember}
            >
                {
                    menu &&
                    menu.map((item, index) => {
                        mappings = [
                            ...mappings,
                            item.id
                        ]
                        return <MenuTableItem key={item.id} index={index} groupId={id} isMember={isMember} {...item} />
                    })
                }
            </TableBody>
        </Table>
    )
}

function composer(props, onData) {
    const mappings = []
    const blacklist = []
    onData(null, {mappings, blacklist})
}

export default composeWithTracker(composer)(MenuTable)