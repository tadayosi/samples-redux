import { Brand, Dropdown, DropdownItem, DropdownToggle, PageHeader, Toolbar, ToolbarGroup, ToolbarItem } from '@patternfly/react-core'
import { EditIcon } from '@patternfly/react-icons'
import { History } from 'history'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'
import { actions } from '../reducer'
import State from '../state'
import { AppProps } from './types'

type AppHeaderProps = AppProps & {
  loggedIn: boolean
  username?: string
  history: History
}

type AppHeaderState = {
  isDropdownOpen: boolean
}

class AppHeader extends React.Component<AppHeaderProps, AppHeaderState> {
  constructor(props: AppHeaderProps) {
    super(props)
    this.state = {
      isDropdownOpen: false
    }
  }

  onDropdownToggle = (isDropdownOpen: boolean) =>
    this.setState({ isDropdownOpen })

  onDropdownSelect = () =>
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen })

  logOut = () => {
    this.props.dispatch(actions.logOut({}))
    this.props.history.push('/', '')
  }

  render() {
    const { loggedIn, username } = this.props
    const { isDropdownOpen } = this.state

    const PageToolbar = (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem>
            {loggedIn ?
              (<Link to="/posts/create">
                <EditIcon />
              </Link>) :
              (<Link to="/users/create">Join</Link>)
            }
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarItem>
            {loggedIn ?
              (<Dropdown
                isPlain
                position="right"
                onSelect={this.onDropdownSelect}
                isOpen={isDropdownOpen}
                toggle={
                  <DropdownToggle onToggle={this.onDropdownToggle}>{username}</DropdownToggle>
                }
                dropdownItems={[
                  <DropdownItem key="logout" onClick={this.logOut}>Log Out</DropdownItem>
                ]}
              />) :
              (<Link to="/login">Log In</Link >)
            }
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar >
    )

    return (
      <PageHeader
        logo={<Brand src={logo} alt="Blog App" />}
        logoProps={{ href: '/' }}
        toolbar={PageToolbar}
      />
    )
  }
}

const mapStateToProps = (state: State) => ({
  loggedIn: state.loggedIn,
  username: state.username
})

export default connect(mapStateToProps)(AppHeader)
