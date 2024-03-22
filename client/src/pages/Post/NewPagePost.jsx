import { useQuery } from "@apollo/client";
import { Container, Row, Col } from "react-bootstrap";
import { QUERY_GET_POSTS } from "../../utils/queries"; 
import NewPostForm from '../../components/NewPostForm';
import './NewPagePost.css';

const AllPostsPage = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    return formattedDate;
  };

  const { loading, error, data } = useQuery(QUERY_GET_POSTS); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sort the posts array based on the createdAt timestamp in descending order
  const sortedPosts = data.posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
    <div className="mb-4 text-center">
      <h1 className="text-center mt-4">Create New Post</h1>
      <p>Current Date: {formatDate(new Date().toISOString())}</p>
      <NewPostForm />
    </div>
    <Container>
      {sortedPosts.map((post) => (
        <div key={post._id} className="post-container border border-dark rounded p-3 mb-3">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Author: {post.author.username}</p> 
          <p>Created at: {formatDate(new Date().toISOString())}</p>
        </div>
      ))}
    </Container>
    </>
  );
};

export default AllPostsPage;


