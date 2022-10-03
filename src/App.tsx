import type { FC } from 'react'
import { memo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAddToUsers, useUsers } from './hooks/useUsers'
import { useUserBusinessCard } from './hooks/useUserBusinessCard'
import { Key } from './entities/key'

const queryClient = new QueryClient()

export const App: FC = memo(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <Main/>
    </QueryClientProvider>
  )
})

export const Main: FC = memo(() => {
  const [users] = useUsers()
  const [addToUsers] = useAddToUsers()
  console.log(users)

  return (<>
    <button onClick={() => addToUsers('Super Man')}>
      Add user with name 'Super Man'
    </button>
    {
      users.map(({id}) => <BusinessCard key={id} userId={id}/>)
    }
  </>)
})

export const BusinessCard: FC<{userId: Key}> = memo(({userId}) => {
  const [businessCard] = useUserBusinessCard(userId)

  return (
    <div>{businessCard?.info}</div>
  )
})
