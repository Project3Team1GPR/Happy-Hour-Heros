import { useQuery, useMutation } from "@apollo/client";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { QUERY_GET_POSTS } from "../../utils/queries";
import NewPostForm from "../../components/NewPostForm";
import "./NewPagePost.css";
import { REMOVE_POST } from "../../utils/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const NewPagePost = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    return formattedDate;
  };

  const { loading, error, data } = useQuery(QUERY_GET_POSTS);
  const [removePost] = useMutation(REMOVE_POST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sort the posts array based on the createdAt timestamp in descending order
  const sortedPosts = data.posts
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Handle removing a post
  const handleRemovePost = async (postId) => {
    try {
      await removePost({
        variables: { postId },
        refetchQueries: [{ query: QUERY_GET_POSTS }], // Refetch the posts after removal
      });
    } catch (err) {
      console.error("Error removing post:", err);
    }
  };

  const { me: loggedInUser } = data;

  console.log("loggedInUser:", loggedInUser); // Debugging statement
  console.log("Sorted Posts:", sortedPosts); // Debugging statement

  return (
    <>
      <div className="mb-4 text-center">
        <h1 className="text-center mt-4">Create New Post</h1>
        <p>Current Date: {formatDate(new Date().toISOString())}</p>
        <NewPostForm />
      </div>
      <Container>
        {sortedPosts.map((post) => (
          <div
            key={post._id}
            className="post-container border border-dark rounded p-3 mb-3"
          >
            <div className="post-link-container">
              <h2>
                <Link to={`/post/${post._id}`} className="post-link">
                  {post.title}
                </Link>
              </h2>
            </div>
            <p><strong>Posted By: {post.author.username}</strong></p>
            <p>{post.content}</p>
            <p className="post-content">Posted: {formatDate(new Date().toISOString())}</p>
            {loggedInUser && loggedInUser._id === post.author._id && (
              <Button
                variant="danger"
                onClick={() => handleRemovePost(post._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            )}
          </div>
        ))}
      </Container>
    </>
  );
};

export default NewPagePost;
