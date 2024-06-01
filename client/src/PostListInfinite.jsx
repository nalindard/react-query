import { useInfiniteQuery } from "@tanstack/react-query"
import { getPostsPaginated } from "./api/posts"

export function PostListInfinite() {
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    getNextPageParam: prevData => prevData.nextPage,
    queryFn: ({ pageParam = 1 }) => getPostsPaginated(pageParam),
  })

  if (status === "loading") return <h1>Loading...</h1>
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>

  return (
    <div className="py-7">
      <h1 className="text-2xl uppercase pb-7 text-teal-400">Post List Infinite</h1>
      {data.pages
        .flatMap(data => data.posts)
        .map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} className={isFetchingNextPage ? 'loading loading-bars' : ''+"w-full btn rounded-none bg-teal-400 bg-opacity-25 my-7"}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  )
}
