import { UserBusinessCard, Users } from '../entities/user'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Key } from '../entities/key'
import { useUsers } from './useUsers'

const USER_BUSINESS_CARD_QUERY_KEY = 'user-business-card'

export function useUserBusinessCard(userId?: Key): [UserBusinessCard | null, boolean] {
  const [users] = useUsers()

  const {data, isLoading} = useQuery<UserBusinessCard, Error>({
    queryKey: [USER_BUSINESS_CARD_QUERY_KEY, userId],
    queryFn: () => getUserBusinessCard(users, userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return [data ?? null, isLoading]
}

export type InvalidateQuery<T> = (value: T) => void

export function useInvalidateUserBusinessCard(): InvalidateQuery<Key> {
  const client = useQueryClient()

  return (userId: Key) => {
    client.invalidateQueries([USER_BUSINESS_CARD_QUERY_KEY, userId]).then()
  }
}

async function getUserBusinessCard(
  users: Users,
  userId?: Key,
): Promise<UserBusinessCard> {
  const user = users.find(value => value.id === userId)!

  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        id: user.id,
        info: `${user.name}\n${user.phone}\n${user.website}\n${user.website}`,
      } as UserBusinessCard)
    }, 500)
  })
}
