import { ActionGroup, Alert, Button, Form, FormGroup, PageSection, PageSectionVariants, Text, TextContent, TextInput } from "@patternfly/react-core"
import React from "react"
import { connect } from "react-redux"
import { login } from "../reducer"
import AppRouteProps from "./types"

type LoginProps = AppRouteProps<{}>

type LoginState = {
  username: string
  password: string
  loginError?: string
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleUsernameChange = (username: string) => this.setState({ username })

  handlePasswordChange = (password: string) => this.setState({ password })

  logIn = () => {
    const { username, password } = this.state
    this.props.dispatch(login(username, password))
      .then(() =>
        this.props.history.push('/', '')
      )
      .catch(() => {
        this.setState({ loginError: 'bad username or password' })
      })
  }

  render() {
    const { username, password, loginError } = this.state
    return (
      <React.Fragment>
        <PageSection variant={PageSectionVariants.light}>
          <TextContent>
            <Text component="h1">Log In</Text>
          </TextContent>
        </PageSection>
        <PageSection variant={PageSectionVariants.light}>
          <Form>
            <FormGroup label="Username" isRequired fieldId="login-form-username">
              <TextInput
                isRequired
                type="text"
                id="login-form-username"
                name="login-form-username"
                value={username}
                onChange={this.handleUsernameChange}
              />
            </FormGroup>
            <FormGroup label="Password" isRequired fieldId="login-form-password">
              <TextInput
                isRequired
                type="password"
                id="login-form-password"
                name="login-form-password"
                value={password}
                onChange={this.handlePasswordChange}
              />
            </FormGroup>
            <ActionGroup>
              <Button onClick={this.logIn}>Log In</Button>
            </ActionGroup>
          </Form>
        </PageSection>
        <PageSection variant={PageSectionVariants.light}>
          {loginError && (
            <Alert variant="danger" title={loginError} isInline isLiveRegion />
          )}
        </PageSection>
      </React.Fragment>
    )
  }
}

export default connect()(Login)
