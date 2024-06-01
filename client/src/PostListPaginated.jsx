import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getPostsPaginated } from './api/posts'

export function PostListPaginated() {
    const [page, setPage] = useState(1)

    const { status, error, data, isPreviousData, isLoading } = useQuery({
        queryKey: ['posts', { page }],
        keepPreviousData: true,
        queryFn: () => getPostsPaginated(page),
    })

    if (status === 'loading') return <h1>Loading...</h1>
    if (status === 'error') return <h1>{JSON.stringify(error)}</h1>

    return (
        <div className='py-7'>
            <h1 className='text-2xl uppercase pb-7 text-teal-400'>
                Post List Paginated
                <br />
                <small>{isPreviousData && 'Previous Data'}</small>
            </h1>
            <div className='h-40'>
                {data.posts.map((post) => (
                    <div key={post.id}>{post.title}</div>
                ))}
            </div>

            <div className='flex *:flex-grow'>
                {data.previousPage && (
                    <button
                        onClick={() => setPage(data.previousPage)}
                        className={
                            isLoading
                                ? 'loading loading-bars'
                                : '' +
                                  'btn rounded-none bg-teal-400 bg-opacity-25 my-7'
                        }>
                        Previous
                    </button>
                )}{' '}
                {data.nextPage && (
                    <button
                        onClick={() => setPage(data.nextPage)}
                        className={
                            isLoading
                                ? 'loading loading-bars'
                                : '' +
                                  'btn rounded-none bg-teal-400 bg-opacity-25 my-7'
                        }>
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}
