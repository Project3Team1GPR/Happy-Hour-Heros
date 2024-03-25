import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Form } from "react-bootstrap";
import { CREATE_COMMENT } from "../utils/mutations";
import { GET_POST_DETAILS } from "../utils/queries";

const CreateCommentForm = ({ postId }) => {
  const [commentContent, setCommentContent] = useState("");
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT);
  const { refetch } = useQuery(GET_POST_DETAILS, {
    variables: { postId },
    skip: true, // Skip initial query execution
  });

  const handleChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createComment({
        variables: {
          commentInput: {
            content: commentContent,
            postId: postId,
          },
        },
      });
      // Clear the comment input after submission
      setCommentContent("");
      refetch();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className=" mx-auto">
          <div className="border border-dark rounded p-4 d-flex justify-content-center">
            <Form onSubmit={handleSubmit} className="w-100">
              <Form.Group controlId="commentContent" className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your comment here..."
                  value={commentContent}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
              {error && (
                <p className="text-danger mt-2">Error: {error.message}</p>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCommentForm;
