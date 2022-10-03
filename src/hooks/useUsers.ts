import { User, Users } from '../entities/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useInvalidateUserBusinessCard } from './useUserBusinessCard'

const USERS_QUERY_KEY = 'users'

export function useUsers(): [Users] {
  const {data} = useQuery<Users, Error>({
    queryKey: [USERS_QUERY_KEY],
    queryFn: () => getUsers(),
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return [data ?? []]
}

export function useAddToUsers(): [AddToUsers] {
  const client = useQueryClient()

  const invalidateUserBusinessCard = useInvalidateUserBusinessCard()

  const {mutate} = useMutation<User, Error, string>({
    mutationFn: (username) => getUserByName(username),
    onSuccess: async (user) => {
      client.setQueryData<Users>([USERS_QUERY_KEY], (oldData) => {
        // oldData?.push(user)
        return [
          ...oldData ?? [],
          user,
        ]
      })

      invalidateUserBusinessCard(user.id)
    },
  })

  return [mutate]
}

type AddToUsers = (username: string) => void

async function getUsers(): Promise<Users> {
  const response = await window.fetch('https://jsonplaceholder.typicode.com/users')
  return await response.json() as Promise<Users>
}

async function getUserByName(username: string): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        id: username,
        name: username,
        email: 'example@example.com',
        phone: '+99999999999',
        website: 'www.example.com',
      } as User)
    }, 500)
  })
}
