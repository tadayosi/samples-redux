export class User {
  constructor(
    public blogName: string,
    public username: string,
    public password: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public postIds: number[] = []
  ) { }
}

export type Users = {
  [username: string]: User
}

export class Post {
  constructor(
    public title: string,
    public body: string,
    public username: string,
    public date: Date = new Date()
  ) { }
}

class State {
  loggedIn: boolean = false
  username?: string
  users: Users = {}
  posts: Post[] = []
  post?: Post
}

export default State
