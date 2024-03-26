import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST_DETAILS, QUERY_GET_ME } from "../../utils/queries";
import { DELETE_COMMENT } from "../../utils/mutations";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./PostDetail.css";
import CreateCommentForm from "../../components/NewCommentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function PostDetailPage() {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    return formattedDate;
  };

  const { postId } = useParams();
  console.log("Post ID:", postId);

  const { loading, error, data, refetch } = useQuery(GET_POST_DETAILS, {
    variables: { postId },
  });

  // Use the QUERY_GET_ME to fetch the logged-in user data
  const { data: userData } = useQuery(QUERY_GET_ME);

  console.log("Data:", data);

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{ query: GET_POST_DETAILS, variables: { postId } }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Destructure post and comments from data
  const { postById: post } = data;

  // Destructure loggedInUser from userData
  const { me: loggedInUser } = userData;

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment({
        variables: { commentId },
      });
      // After deleting the comment, manually refetch the post details
      refetch();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  console.log("loggedInUser:", loggedInUser); // Debugging statement
  console.log("Comments:", post.comments); // Debugging statement

  return (
    <Container>
      <Container className="postDetail-container border border-dark rounded p-3 mb-3">
        <div className="post-title-container">
          <h1>{post.title}</h1>
        </div>
        <p className="post-content">{post.content}</p>
        <p>Post by: {post.author.username}</p>
        <p>Posted: {formatDate(new Date().toISOString())}</p>
      </Container>

      <div style={{ marginBottom: "50px" }} />

      <CreateCommentForm postId={postId} />

      <div style={{ marginBottom: "50px" }} />

      <Container>
        <div className="text-center">
          <h2>Comments</h2>
        </div>
        {post.comments.map((comment) => (
          <div
            key={comment._id}
            className="postDetail-container border border-dark rounded p-3 mb-3"
          >
            <p>{comment.content}</p>
            <p>Posted by: {comment.author.username}</p>
            <p>Posted: {formatDate(new Date().toISOString())}</p>
            {loggedInUser && loggedInUser._id === comment.author._id && (
              <Button
                variant="danger"
                onClick={() => handleDeleteComment(comment._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            )}
          </div>
        ))}
      </Container>

      {/* Back button */}
      <Button as={Link} to="/post" variant="secondary" className="mt-3">
        Back to Posts
      </Button>
    </Container>
  );
}

export default PostDetailPage;
