import { Key } from './key'

export type User = {
  id: Key
  name: string
  email: string
  phone: string
  website: string
}

export type Users = User[]

export type UserBusinessCard = {
  id: Key
  info: string
}
