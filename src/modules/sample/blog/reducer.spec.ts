import State, { User } from './state'
import reducer, { actions } from './reducer'


describe('reducer', () => {
  it('should create user', () => {
    const user1 = new User('b1', 'u1', 'p1')
    const user2 = new User('b2', 'u2', 'p2')
    let state = new State()
    expect(state.users).toEqual({})
    state = reducer(state, actions.createUser.started({ user: user1 }))
    state = reducer(state, actions.createUser.started({ user: user2 }))
    expect(state.users).toHaveProperty('u1')
    expect(state.users).toHaveProperty('u2')
  })
})
