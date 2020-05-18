import { Page } from '@patternfly/react-core'
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppHeader from './AppHeader'
import Login from './Login'
import PostEdit from './PostEdit'
import PostList from './PostList'
import PostView from './PostView'
import AppRouteProps from './types'
import UserEdit from './UserEdit'
import UserList from './UserList'
import UserView from './UserView'

type AppLayoutProps = AppRouteProps<{}>

const AppLayout: React.SFC<AppLayoutProps> = props => {
  const Header = (<AppHeader history={props.history} />)

  const Routes = (
    <Switch>
      <Route path="/posts/:pageNum/?" component={PostList} />
      <Route path="/posts/create" component={PostEdit} />
      <Route path="/posts/:postId/edit" component={PostEdit} />
      <Route path="/posts/:postId" component={PostView} />
      <Route path="/users" exact component={UserList} />
      <Route path="/users/create" component={UserEdit} />
      <Route path="/users/:userId" component={UserView} />
      <Route path="/users/:userId/edit" component={UserEdit} />
      <Route path="/login" component={Login} />
      <Route path="*" component={PostList} />
    </Switch>
  )

  return (
    <Page header={Header}>
      {Routes}
    </Page>
  )
}

const App: React.SFC<{}> = () =>
  <BrowserRouter>
    <Route path="/" component={AppLayout} />
  </BrowserRouter>

export default connect()(App)
