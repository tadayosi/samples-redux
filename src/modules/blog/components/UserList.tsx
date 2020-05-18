import { Avatar, Card, CardBody, CardHead, CardHeader, CardHeadMain, PageSection, PageSectionVariants } from '@patternfly/react-core'
import React from 'react'
import { connect } from 'react-redux'
import avatarImg from '../../../img/img_avatar.svg'
import State, { Users } from '../state'
import AppRouteProps from './types'

type UserListProps = AppRouteProps<{}> & {
  users: Users
}

type UserListState = {
}

class UserList extends React.Component<UserListProps, UserListState> {
  constructor(props: UserListProps) {
    super(props)
    this.state = {
    }
  }

  onClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const selected = event.currentTarget.id
    if (this.props.users[selected]) {
      this.props.history.push(`/users/${selected}`, '')
    }
  }

  render() {
    const { users } = this.props

    return (
      <PageSection variant={PageSectionVariants.light}>
        {users && Object.keys(users).map(key => users[key]).map((user, index) => (
          <React.Fragment key={index}>
            <Card
              id={user.username}
              onClick={this.onClick}
              isSelectable>
              <CardHead>
                <CardHeadMain>
                  <Avatar src={avatarImg} alt={user.username} />
                </CardHeadMain>
              </CardHead>
              <CardHeader>
                {user.blogName}
              </CardHeader>
              <CardBody>
                {user.firstName} {user.lastName}
              </CardBody>
            </Card>
            <br />
          </React.Fragment>
        ))}
      </PageSection>
    )
  }
}

const mapStateToProps = (state: State) => ({
  users: state.users
})

export default connect(mapStateToProps)(UserList)
