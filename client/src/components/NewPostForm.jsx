import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import { QUERY_GET_POSTS } from "../utils/queries";

function NewPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [formIncomplete, setFormIncomplete] = useState(false);


  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    // Update the cache after the mutation is successful
    update(cache, { data: { createPost } }) {
      // Read the existing posts from the cache
      const { posts } = cache.readQuery({ query: QUERY_GET_POSTS });
      // Update the posts array with the newly created post
      cache.writeQuery({
        query: QUERY_GET_POSTS,
        data: { posts: [createPost, ...posts] }, // Prepend the new post to the existing posts
      });
    },
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the form fields are empty
    if (!title || !content) {
      setFormIncomplete(true);
      return; // Exit early if the form is incomplete
    }

    try {
      // Execute the createPost mutation with the provided variables
      const { data } = await createPost({
        variables: {
          postInput: { title, content },
        },
      });

      // Handle successful mutation response
      console.log("New post created:", data.createPost);

      // Clear form fields after successful submission
      setTitle("");
      setContent("");
      setFormIncomplete(false);
    } catch (err) {
      // Handle mutation error
      console.error("Error creating post:", err);
    }
  };

  const handleInputChange = () => {
    if (formIncomplete) {
      setFormIncomplete(false);
    }
  };

  return (
    <div className="container" s>
      <div className="row">
        <div className=" mx-auto">
          <div className="border border-dark rounded p-4 d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="w-100">
            <h4 className="merriweather-regular-italic">Add New Topic </h4>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => { setTitle(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => { setContent(e.target.value);
                    handleInputChange();
                  }}
                />
              </div>
              {formIncomplete && (
                <p className="text-danger">Please complete the form to create a post.</p>
              )}
              <button type="submit" className="btn btn-primary">
                Create Post
              </button>
              {loading && <p>Loading...</p>}
              {error && <p>Error creating post: {error.message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPostForm;
