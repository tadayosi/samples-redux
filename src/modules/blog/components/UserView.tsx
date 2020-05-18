import { Avatar, PageSection, PageSectionVariants, Text, TextContent } from '@patternfly/react-core'
import React from 'react'
import { connect } from 'react-redux'
import avatarImg from '../../../img/img_avatar.svg'
import State, { Users } from '../state'
import AppRouteProps from './types'

type UserViewProps = AppRouteProps<{ userId: string }> & {
  users: Users
}

type UserViewState = {
}

class UserView extends React.Component<UserViewProps, UserViewState> {
  constructor(props: UserViewProps) {
    super(props)
    this.state = {}
  }

  render() {
    const { users, match: { params: { userId } } } = this.props
    const user = users[userId]
    return (
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Avatar src={avatarImg} alt={user.username} />
          <Text component="h1">{user.blogName}</Text>
          <Text component="p">by {user.firstName} {user.lastName}</Text>
        </TextContent>
      </PageSection>
    )
  }
}

const mapStateToProps = (state: State) => ({
  users: state.users
})

export default connect(mapStateToProps)(UserView)
