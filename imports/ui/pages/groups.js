import React from 'react'
import CreateGroup  from '../components/groups/create'
import GroupsGrid  from '../components/groups/grid'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

const GroupsPage = () => (
    <section className="app__section" id="groups">
        <Container fluid={true}>
            <h1>User groups</h1>
            <Row>
                <Col md="12" lg="3">
                    <CreateGroup />
                </Col>
                <Col md="12" lg="9">
                    <GroupsGrid />
                </Col>
            </Row>
        </Container>
    </section>
)

export default GroupsPage