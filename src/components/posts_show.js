import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost,deletePost } from  '../actions';

class PostsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
      //the below code is provider by react-router
      //params is the path which we give it in the routes.js
      //this.props.match.params.id; === const { id } = this.props.match.params;
      const { id } = this.props.match.params;
        this.props.fetchPost(id);
  }

  onDeletePost = () =>{
      const { id } = this.props.match.params;
      this.props.deletePost(id,() =>{
          this.props.history.push('/');
      });
  }
  render() {
    //  posts[this.props.match.params.id]; // the posts which we want to show
    const  { post } = this.props;

    if(!post){
      return <div>Loading...</div>
    }

    return (
      <div className="class-name">
            <Link to="/">Back To Index</Link>
            <button className="btn btn-danger pull-xs-right" onClick={this.onDeletePost}>
                Delete Post
            </button>
            <h3>{post.title}</h3>
            <h6>Categories : {post.categories}</h6>
            <p>{post.content}</p>
      </div>
    );
  }
}
//posts is coming by reducer state
// function mapStateToProps(state){
//   return {
//     posts : state.posts
//   };
// }

//ownProps will check the component which is exisiting in
//this.props === ownProps
//will only take the single post based on the id
function mapStateToProps({ posts }, ownProps){
  return {
        post : posts[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps,{ fetchPost,deletePost })(PostsShow);
