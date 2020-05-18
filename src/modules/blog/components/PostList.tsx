import { Button, EmptyState, EmptyStateIcon, EmptyStateVariant, PageSection, PageSectionVariants, Title } from "@patternfly/react-core"
import { AddCircleOIcon } from '@patternfly/react-icons'
import React from "react"
import { connect } from 'react-redux'
import { actions } from '../reducer'
import State, { Post } from '../state'
import PostView from './PostView'
import AppRouteProps from "./types"

type PostListProps = AppRouteProps<{}> & {
  posts: Post[]
}

const PostList: React.SFC<PostListProps> = props => {
  // cleanup
  props.dispatch(actions.unloadPost({}))

  const { posts } = props
  if (posts.length === 0) {
    return (
      <PageSection variant={PageSectionVariants.light}>
        <EmptyState variant={EmptyStateVariant.full}>
          <EmptyStateIcon icon={AddCircleOIcon} />
          <Title headingLevel="h1" size="lg">
            No blog posts yet
          </Title>
          <Button variant="primary" component="a" href="users/create">Join</Button>
          {' '}
          <Button variant="secondary" component="a" href="/login">Log In</Button>
        </EmptyState>
      </PageSection>
    )
  }
  return (
    <React.Fragment>
      {posts.map((post, postId) => {
        const viewProps = {
          ...props,
          summary: true,
          match: { ...props.match, params: { postId } }
        }
        return (<PostView key={'post' + postId} {...viewProps} />)
      })}
    </React.Fragment>
  )
}


const mapStateToProps = (state: State) => ({
  posts: state.posts
})

export default connect(mapStateToProps)(PostList)
