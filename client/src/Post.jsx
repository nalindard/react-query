import { useQuery } from '@tanstack/react-query'
import { getPost } from './api/posts'
import { getUser } from './api/users'

export default function Post({ id }) {
    const postQuery = useQuery({
        queryKey: ['posts', id],
        queryFn: () => getPost(id),
    })

    const userQuery = useQuery({
        queryKey: ['users', postQuery?.data?.userId],
        enabled: postQuery?.data?.userId != null,
        queryFn: () => getUser(postQuery.data.userId),
    })

    if (postQuery.status === 'loading') return <h1>Loading...</h1>
    if (postQuery.status === 'error') {
        return <h1>{JSON.stringify(postQuery.error)}</h1>
    }

    return (
        <div className='py-7'>
            <h1 className='text-2xl uppercase pb-7 text-teal-400'>
                {postQuery.data.title} <br />
                <small
                    className={
                        userQuery.isLoading ? 'loading loading-bars' : ''
                    }>
                    {userQuery.isLoading
                        ? 'Loading User...'
                        : userQuery.isError
                        ? 'Error Loading User'
                        : userQuery.data.name}
                </small>
            </h1>
            <p>{postQuery.data.body}</p>
        </div>
    )
}
