import React from 'react';

class NewPost extends React.Component {
  newPost = async (e) => {
    e.preventDefault();

    // Get form data from state
    const { title, content } = this.state;

    if (title && content) {
      try {
        // Make API call
        await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            contents: content,
          }),
          headers: { "Content-Type": "application/json" },
        });

        // Redirect after successful submission
        document.location.replace("/dashboard");
      } catch (error) {
        console.error("Error submitting post:", error);
      }
    } else {
      alert("Please enter both title and content.");
    }
  };

  // Define initial state
  state = {
    title: '',
    content: ''
  };

  // Update state as user types
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <section className="card border-dark text-center mt-4">
        <h1 className="mt-4">Create New Post</h1>
        <div className="card-body">
          <form id="new-post" onSubmit={this.newPost}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input 
                type="text" 
                className="form-control" 
                id="title" 
                placeholder="Enter Post Title" 
                value={this.state.title} 
                onChange={this.handleChange} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content:</label>
              <textarea 
                className="form-control" 
                id="content" 
                placeholder="Write your post here" 
                value={this.state.content} 
                onChange={this.handleChange} 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'black', color: '#ffffff' }}>Create Post</button>
          </form>
        </div>
      </section>
    );
  }
}

export default NewPost;
