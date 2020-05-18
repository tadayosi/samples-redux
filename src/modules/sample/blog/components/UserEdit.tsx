import { ActionGroup, Alert, Button, Form, FormGroup, PageSection, PageSectionVariants, Text, TextContent, TextInput } from "@patternfly/react-core"
import React from "react"
import { connect } from "react-redux"
import { createUser } from '../reducer'
import { User } from '../state'
import AppRouteProps from "./types"

type UserEditProps = AppRouteProps<{}>

type UserEditState = {
  detail: User
  profileImageFilename?: string
  error?: string
}

class UserEdit extends React.Component<UserEditProps, UserEditState> {
  constructor(props: UserEditProps) {
    super(props)
    this.state = {
      detail: {
        blogName: '',
        username: '',
        password: '',
        postIds: []
      }
    }
  }

  handleBlogNameChange = (blogName: string) => this.setState({
    detail: { ...this.state.detail, blogName }
  })
  handleUsernameChange = (username: string) => this.setState({
    detail: { ...this.state.detail, username }
  })
  handlePasswordChange = (password: string) => this.setState({
    detail: { ...this.state.detail, password }
  })
  handleFirstNameChange = (firstName: string) => this.setState({
    detail: { ...this.state.detail, firstName }
  })
  handleLastNameChange = (lastName: string) => this.setState({
    detail: { ...this.state.detail, lastName }
  })
  handleEmailChange = (email: string) => this.setState({
    detail: { ...this.state.detail, email }
  })

  createUser = () => {
    const { detail } = this.state
    this.props.dispatch(createUser(detail))
      .then(() =>
        this.props.history.push('/', '')
      )
      .catch(() => {
        this.setState({ error: 'failed to create user' })
      })
  }

  render() {
    const { detail, error } = this.state
    return (
      <React.Fragment>
        <PageSection variant={PageSectionVariants.light}>
          <TextContent>
            <Text component="h1">Become an Author</Text>
          </TextContent>
        </PageSection>
        <PageSection variant={PageSectionVariants.light}>
          <Form isHorizontal>
            <FormGroup label="Blog name" isRequired fieldId="edit-form-blogname">
              <TextInput
                isRequired
                type="text"
                id="edit-form-blogname"
                name="edit-form-blogname"
                value={detail.blogName}
                onChange={this.handleBlogNameChange}
              />
            </FormGroup>
            <FormGroup label="Username" isRequired fieldId="edit-form-username">
              <TextInput
                isRequired
                type="text"
                id="edit-form-username"
                name="edit-form-username"
                value={detail.username}
                onChange={this.handleUsernameChange}
              />
            </FormGroup>
            <FormGroup label="Password" isRequired fieldId="edit-form-password">
              <TextInput
                isRequired
                type="password"
                id="edit-form-password"
                name="edit-form-password"
                value={detail.password}
                onChange={this.handlePasswordChange}
              />
            </FormGroup>
            <FormGroup label="First name" fieldId="edit-form-firstname">
              <TextInput
                type="text"
                id="edit-form-firstname"
                name="edit-form-firstname"
                value={detail.firstName}
                onChange={this.handleFirstNameChange}
              />
            </FormGroup>
            <FormGroup label="Last name" fieldId="edit-form-lastname">
              <TextInput
                type="text"
                id="edit-form-lastname"
                name="edit-form-lastname"
                value={detail.lastName}
                onChange={this.handleLastNameChange}
              />
            </FormGroup>
            <FormGroup label="Email" fieldId="edit-form-email">
              <TextInput
                type="text"
                id="edit-form-email"
                name="edit-form-email"
                value={detail.email}
                onChange={this.handleEmailChange}
              />
            </FormGroup>
            <ActionGroup>
              <Button onClick={this.createUser}>I'm ready to write</Button>
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

export default connect()(UserEdit)
