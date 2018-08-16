import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import _ from  'lodash';

class PostsIndex extends Component{

  componentDidMount(){
      this.props.fetchPosts();
      //this.props.fetchPosts().then((data)=>{console.log('api-data',data)});

  }
  renderPosts(){
      {/*since the posts in mapStateToProps is an object(check console.log() of posts-->;) we cant use map so we can use loadash*/}
      return  _.map(this.props.posts,post =>{
          return (
              <li className="list-group-item" key={post.id}>
                <Link to={`/posts/${post.id}`}>
                    {post.title}
                </Link>
              </li>
          );
      });
    }

    render(){
    console.log('posts-->:',this.props.posts);
      return(
        <div>
          <div className="text-xs-right">
              <Link to="/posts/new" className="btn btn-primary">
                  Add New Post
              </Link>
          </div>
          <h3>Posts</h3>
          <ul className = "list-group">
              {this.renderPosts()}
          </ul>
        </div>
      );
    }
}

function mapStateToProps(state){
    return { posts :  state.posts };
}
// function mapDispatchToProps(dispatch){
//     return bindActionCreators({fetchPosts},dispatch)
// }

//export default connect(null,mapDispatchToProps)(PostsIndex);
export default connect(mapStateToProps,{ fetchPosts })(PostsIndex);
