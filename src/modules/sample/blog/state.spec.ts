import State, { User } from './state'


describe('state', () => {
  it('should add users', () => {
    const user1 = new User('b1', 'u1', 'p1')
    const user2 = new User('b2', 'u2', 'p2')
    const state = new State()
    expect(state.users).toEqual({})
    state.users[user1.username] = user1
    state.users[user2.username] = user2
    expect(state.users).toHaveProperty('u1')
    expect(state.users).toHaveProperty('u2')
  })
})
