import React from 'react';
import NewPost from '../components/NewPostForm'; 

const NewPostPage = () => {
  return (
    <div>
      <h1 className="text-center mt-4">Create New Post</h1>
      <NewPost />
    </div>
  );
};

export default NewPostPage;
