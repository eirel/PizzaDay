import React from 'react'
import { CreateGroup, GroupsGrid } from '../components/groups'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Invites from '../components/invites'

const ProfilePage = () => (
    <section className="app__section" id="profile">
        <Container fluid={true}>
            <Invites />
        </Container>
    </section>
)

export default ProfilePage