import { FETCH_POSTS,FETCH_POST,DELETE_POST } from  '../actions';
import _ from 'lodash';

export default function(state={},action){
//  console.log(`actionsssss:${action.payload}`);
// console.log('action:->',action.payload);

    switch (action.type) {
      case  FETCH_POSTS:
        return _.mapKeys(action.payload.data,'id'); /* refer mapKeys ex*/

      case FETCH_POST://refer *
        return { ...state, [action.payload.data.id]: action.payload.data };


        case DELETE_POST://refer **
          return _.omit(state,action.payload);

      default:
        return state;
    }
}


//**es5// const post = action.payload.data;
  // const newState =  { ...state };
  // newState[post.id] = post;
  // return newState;
  //by using squarebrackets[] we are doing key interplication
  //what evert the variable [action.data.payload.id],make a new key on this object and sets its
  //value to action.data.payload.data

  //*
  //we are writing this 'z once the list is delete and it will only remove from the postindex page
  // but not in the network request
//look at the state object,if the state object has a key action.payload(postId) just omit or drop it
//and return an new object that doesnt not contain id anymore
