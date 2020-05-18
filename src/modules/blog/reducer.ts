import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from "typescript-fsa-reducers"
import State, { Post, User } from "./state"

const actionCreator = actionCreatorFactory('sample/blog')

export const actions = {
  getPost: actionCreator.async<
    { postId: number },
    { post: Post }
  >('GET_POST'),

  unloadPost: actionCreator<{}>('UNLOAD_POST'),

  modifyPost: actionCreator.async<
    { post: Post, postId?: number },
    {}
  >('MODIFY_POST'),

  login: actionCreator.async<
    { username: string, password: string },
    {}
  >('LOGIN'),

  logOut: actionCreator<{}>('LOG_OUT'),

  createUser: actionCreator.async<
    { user: User },
    {}
  >('CREATE_USER'),

  editUser: actionCreator.async<{}, {}>('EDIT_USER'),

  search: actionCreator.async<{}, {}>('SEARCH'),

  getSessionContext: actionCreator<{}>('GET_SESSION_CONTEXT')
}

export type AppThunkAction = ThunkAction<Promise<void>, State, any, Action<any>>
export type AppThunkDispatch = ThunkDispatch<State, any, Action<any>>

export const login = (username: string, password: string): AppThunkAction =>
  (dispatch: AppThunkDispatch, getState) => {
    dispatch(actions.login.started({ username, password }))
    return new Promise((resolve, reject) => {
      if (getState().loggedIn) {
        dispatch(actions.login.done({ params: { username, password }, result: {} }))
        resolve()
      } else {
        dispatch(actions.login.failed({ params: { username, password }, error: {} }))
        reject()
      }
    })
  }

export const createUser = (user: User): AppThunkAction =>
  (dispatch: AppThunkDispatch) => {
    return new Promise((resolve, reject) => {
      if (user.blogName && user.username && user.password) {
        dispatch(actions.createUser.started({ user }))
        dispatch(actions.createUser.done({ params: { user }, result: {} }))
        resolve()
      } else {
        dispatch(actions.createUser.failed({ params: { user }, error: {} }))
        reject()
      }
    })
  }

export const modifyPost = (post: Post, postId?: number): AppThunkAction =>
  (dispatch: AppThunkDispatch) => {
    return new Promise((resolve, reject) => {
      if (post.title && post.body && post.username) {
        dispatch(actions.modifyPost.started({ post, postId }))
        dispatch(actions.modifyPost.done({ params: { post, postId }, result: {} }))
        resolve()
      } else {
        dispatch(actions.modifyPost.failed({ params: { post, postId }, error: {} }))
        reject()
      }
    })
  }

export const getPost = (postId: number): AppThunkAction =>
  (dispatch: AppThunkDispatch, getState) => {
    dispatch(actions.getPost.started({ postId }))
    return new Promise((resolve, reject) => {
      const post = getState().post
      if (post) {
        dispatch(actions.getPost.done({ params: { postId }, result: { post } }))
        resolve()
      } else {
        dispatch(actions.getPost.failed({ params: { postId }, error: {} }))
        reject()
      }
    })
  }

const reducer = reducerWithInitialState(new State())
  .case(actions.login.started, (state, { username, password }) => {
    console.log(`login attempt: username=${username}, password=${password}`)
    const user = state.users[username]
    if (user && user.password === password) {
      return { ...state, loggedIn: true, username }
    }
    return { ...state, loggedIn: false }
  })
  .case(actions.login.done, (state) => {
    console.log('login success')
    return state
  })
  .case(actions.login.failed, (state) => {
    console.log('login failed')
    return state
  })
  .case(actions.logOut, (state) => {
    console.log(`logout: ${state.username}`)
    return { ...state, loggedIn: false, username: undefined }
  })
  .case(actions.createUser.started, (state, { user }) => {
    const users = { ...state.users }
    users[user.username] = user
    return { ...state, users }
  })
  .cases([actions.createUser.done, actions.createUser.failed], (state) => {
    return state
  })
  .case(actions.modifyPost.started, (state, { post, postId }) => {
    if (!state.username) {
      console.log('modifyPost: not logged in')
      return state
    }
    const posts = state.posts ? state.posts : []
    if (postId) {
      if (state.username !== post.username || state.username !== posts[postId].username) {
        console.log('modifyPost: something went wrong with username')
        return state
      }
      posts[postId] = post
      return { ...state, posts }
    } else {
      posts.push(post)
      const newPostId = posts.length - 1
      const users = state.users
      const user = users[state.username]
      if (!user.postIds) {
        user.postIds = []
      }
      users[state.username].postIds.push(newPostId)
      return { ...state, users, posts }
    }
  })
  .case(actions.modifyPost.done, (state) => {
    console.log('modifyPost success')
    return state
  })
  .case(actions.modifyPost.failed, (state) => {
    console.log('modifyPost failed')
    return state
  })
  .case(actions.getPost.started, (state, { postId }) => {
    const post = state.posts[postId]
    return { ...state, post }
  })
  .case(actions.unloadPost, (state) => ({ ...state, post: undefined }))

export default reducer
