import { Avatar, Button, Card, CardBody, CardFooter, CardHead, CardHeader, CardHeadMain, PageSection, PageSectionVariants, Text, TextContent, TextVariants } from '@patternfly/react-core'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import avatarImg from '../../../../img/img_avatar.svg'
import State, { Post, Users } from '../state'
import AppRouteProps from './types'

export type PostViewProps = AppRouteProps<{ postId: number }> & {
  posts: Post[]
  users: Users
  username?: string
  summary: boolean
}

type PostViewState = {
}

class PostView extends React.Component<PostViewProps, PostViewState> {
  constructor(props: PostViewProps) {
    super(props)
    this.state = {}
  }

  summary = (body: string) => {
    if (body.length > 100) {
      return body.slice(0, 100) + "..."
    } else {
      return body
    }
  }

  render() {
    const { posts, users, username, summary, match: { params: { postId } } } = this.props
    const post = posts[postId]
    const user = users[post.username]
    return (
      <PageSection variant={PageSectionVariants.light}>
        {summary ?
          (
            // summary
            <Card
              id="post-{postId}"
              isSelectable>
              <CardHead>
                <CardHeadMain>
                  <Avatar src={avatarImg} alt={user.username} />
                </CardHeadMain>
              </CardHead>
              <CardHeader>
                {post.title}
                <br />
                <Text component={TextVariants.small}>{user.firstName} {user.lastName}</Text>
                <br />
                <Text component={TextVariants.small}>{post.date.toString()}</Text>
              </CardHeader>
              <CardBody>
                {this.summary(post.body)}
              </CardBody>
              <CardFooter>
                <Link to={'/posts/' + postId}>read more &rarr;</Link>
              </CardFooter>
              {post.username === username && (
                <CardFooter>
                  <Button component="a" href={`/posts/${postId}/edit`}>Edit Post</Button>
                </CardFooter>
              )}
            </Card>
          ) : (
            // full article
            <TextContent>
              <Avatar src={avatarImg} alt={post.username} />
              <Text component="h1">{post.title}</Text>
              <Text component={TextVariants.small}>{user.firstName} {user.lastName}</Text>
              <Text component="p">{post.body}</Text>
              <Text component={TextVariants.small}>{post.date}</Text>
              <Text component="p">
                <Link to="/">&larr; Back</Link>
              </Text>
              {post.username === username && (
                <Text component="p">
                  <Button component="a" href={`/posts/${postId}/edit`}>Edit Post</Button>
                </Text>
              )}
            </TextContent>
          )
        }
      </PageSection>
    )
  }
}

const mapStateToProps = (state: State) => ({
  posts: state.posts,
  users: state.users,
  username: state.username
})

export default connect(mapStateToProps)(PostView)
