import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { getPost } from './api/posts'
import { CreatePost } from './CreatePost'
import Post from './Post'
import { PostListInfinite } from './PostListInfinite'
import { PostListPaginated } from './PostListPaginated'
import PostsList1 from './PostsList1'
import PostsList2 from './PostsList2'

export default function App() {
    const [currentPage, setCurrentPage] = useState(<PostsList1 />)
    const queryClient = useQueryClient()

    function onHoverPostOneLink() {
        queryClient.prefetchQuery({
            queryKey: ['posts', 1],
            queryFn: () => getPost(1),
        })
    }

    return (
        <div className='px-20 pt-12 w-[900px] mx-auto'>
            <div className='bg-teal-400 bg-opacity-20 flex *:flex-grow *:border-none'>
                <button className='btn rounded-none bg-teal-400 bg-opacity-5  border-none' onClick={() => setCurrentPage(<PostsList1 />)}>
                    Posts List 1
                </button>
                <button className='btn rounded-none bg-teal-400 bg-opacity-5 ' onClick={() => setCurrentPage(<PostsList2 />)}>
                    Posts List 2
                </button>
                <button className='btn rounded-none bg-teal-400 bg-opacity-5 '
                    onMouseEnter={onHoverPostOneLink}
                    onClick={() => setCurrentPage(<Post id={1} />)}>
                    First Post
                </button>
                <button className='btn rounded-none bg-teal-400 bg-opacity-5 '
                    onClick={() =>
                        setCurrentPage(
                            <CreatePost setCurrentPage={setCurrentPage} />
                        )
                    }>
                    New Post
                </button>
                <button className='btn rounded-none bg-teal-400 bg-opacity-5 ' onClick={() => setCurrentPage(<PostListPaginated />)}>
                    Post List Paginated
                </button>
                <button className='btn rounded-none bg-teal-400 bg-opacity-5 ' onClick={() => setCurrentPage(<PostListInfinite />)}>
                    Post List Infinite
                </button>
                <br />
            </div>

            <hr className=' opacity-20'/>

            {currentPage}
        </div>
    )
}
