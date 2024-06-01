import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { createPost } from "./api/posts"
import Post from "./Post"

export function CreatePost({ setCurrentPage }) {
  const titleRef = useRef()
  const bodyRef = useRef()
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: data => {
      queryClient.setQueryData(["posts", data.id], data)
      queryClient.invalidateQueries(["posts"], { exact: true })
      setCurrentPage(<Post id={data.id} />)
    },
  })

  function handleSubmit(e) {
    e.preventDefault()
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    })
  }

  return (
    <div className="py-7">
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1  className="text-2xl uppercase pb-7 text-teal-400">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-4">
          <label htmlFor="title" className="w-20 text-xl">Title</label>
          <input id="title" ref={titleRef} className="flex-grow"/>
        </div>
        <div className="flex mb-4">
          <label htmlFor="body" className="w-20 text-xl">Body</label>
          <input id="body" ref={bodyRef} className="flex-grow"/>
        </div>
        <button disabled={createPostMutation.isLoading} className={ createPostMutation.isLoading ? `loading loading-bars`: '' + `w-full btn rounded-none bg-teal-400 bg-opacity-25 my-7`}>
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  )
}
