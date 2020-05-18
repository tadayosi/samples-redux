import { ActionGroup, Alert, Bullseye, Button, Form, FormGroup, PageSection, PageSectionVariants, Spinner, TextArea, TextInput } from '@patternfly/react-core'
import React from 'react'
import { connect } from 'react-redux'
import { getPost, modifyPost } from '../reducer'
import State, { Post, User } from '../state'
import AppRouteProps from './types'

type PostEditProps = AppRouteProps<{ postId?: number }> & {
  user?: User
  post?: Post
}

type PostEditState = {
  title: string
  body: string
  error?: string
  edit: boolean
  isLoading: boolean
}

class PostEdit extends React.Component<PostEditProps, PostEditState> {
  constructor(props: PostEditProps) {
    super(props)
    this.postId = props.match.params.postId
    let edit = false
    let isLoading = false
    if (this.postId) {
      edit = true
      this.props.dispatch(getPost(this.postId))
      isLoading = true
    }
    this.state = {
      title: '',
      body: '',
      edit,
      isLoading
    }
  }

  private postId?: number

  static getDerivedStateFromProps(props: PostEditProps, state: PostEditState) {
    const { post } = props
    if (state.edit && post) {
      return {
        ...state,
        title: post.title,
        body: post.body,
        isLoading: false
      }
    }
    return state
  }

  onTitleChange = (title: string) => this.setState({ title })
  onBodyChange = (body: string) => this.setState({ body })

  submit = () => {
    const { user, post } = this.props
    const { title, body, edit } = this.state

    let postToEdit
    if (edit && post) {
      postToEdit = post
      postToEdit.title = title
      postToEdit.body = body
    } else {
      postToEdit = new Post(title, body, user ? user.username : '')
    }
    this.props.dispatch(modifyPost(postToEdit, this.postId))
      .then(() =>
        this.props.history.push('/', '')
      )
      .catch(() => {
        this.setState({ error: 'failed to create post' })
      })
  }

  render() {
    const { title, body, error, edit, isLoading } = this.state
    if (edit && isLoading) {
      return (
        <React.Fragment >
          <PageSection variant={PageSectionVariants.light}>
            <Bullseye>
              <Spinner size="xl" />
            </Bullseye>
          </PageSection>
        </React.Fragment >
      )
    }
    return (
      <React.Fragment>
        <PageSection variant={PageSectionVariants.light}>
          <Form>
            <FormGroup label="Title" isRequired fieldId="post-edit-title">
              <TextInput
                isRequired
                type="text"
                id="post-edit-title"
                name="post-edit-title"
                value={title}
                onChange={this.onTitleChange}
              />
            </FormGroup>
            <FormGroup label="Body" fieldId="post-edit-body">
              <TextArea
                isRequired
                type="text"
                id="post-edit-body"
                name="post-edit-body"
                value={body}
                onChange={this.onBodyChange}
                rows={15}
              />
            </FormGroup>
            <ActionGroup>
              <Button onClick={this.submit}>
                {this.postId ? "Edit" : "Create"} Post
              </Button>
            </ActionGroup>
          </Form>
        </PageSection>
        <PageSection variant={PageSectionVariants.light}>
          {error && (
            <Alert variant="danger" title={error} isInline isLiveRegion />
          )}
        </PageSection>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: State) => ({
  user: state.username ? state.users[state.username] : undefined,
  post: state.post
})

export default connect(mapStateToProps)(PostEdit)
