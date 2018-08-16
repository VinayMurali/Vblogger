import React, { Component } from 'react';
import { Field,reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';


class PostsNew extends Component {

//argunment field is parameter from redux-form,it will be responsiable for event handlers
  renderField(field)  {
    const className = `form-group ${ field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
    // console.log('inside render field-value of field',field);
    // console.log('redux-form-props-->',this.props);
        return(<div className={className}>
                  <label>{field.label}</label>
                   <input
                        className="form-control"
                        type="text"
                        {...field.input}
                    />
                  <div className="text-help">
                   {field.meta.touched ?  field.meta.error : ''}
                </div>
                  {/* if th user has touched form and not enterted anyhting show the error msg*
                      user has touched and error exits
                    */}
                </div>
              );
  };
// field.input is an object which contain bunch of event handlers or props like,onchange,onBlur,onfocus,
// it also has the value of the input etc
// ... meaning of this is ,its an object,all of the property of this object
// will be props to the input tag
// eg {...field.input}=== all the property of field will be given to the input tag
// eg :
//       onchange={field.input.onchange}
//       onFocus={field.input.onFocus}
//       onBlur={field.input.onBlur}
//{field.meta.error}  since we are connecting the form and validate function by name(both shld be identifical)
//since both are indentical we are getting field object automatically gets field.meta.error by redux form
//
//

onSubmit = (values) => {
  console.log('inside onSubmit',values);
    this.props.createPost(values,()=>{
      this.props.history.push('/');
    });
}

  render() {
    console.log('redux-form-props-->',this.props);
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          label="Title For Post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/"className = "btn btn-primary">Cancel</Link>
      </form>
      );
  }
}
// this function will be called automatically at certain points by redux import React from 'react';
//ex:while submiting

  function validate(values) {
  //we are exporting the validate the forms
    // console.log('form-values:',values);
    const errors = {};
    //validate the input from values
    // title is the name of the redux form
    //redux form and validate are comminutated by name
    // !values.title=== if title has no values
      if(!values.title){
        errors.title = "Enter a title";
      }
      if(!values.categories){
        errors.categories = "Enter some categories";
      }
      if(!values.content){
        errors.content = "Enter some content";
      }
    //if errors is empty,then form is fine to submit
    //if the errors has any properties,redux form assumes form is invalid
    return errors;
}

export default reduxForm({
  validate,
  form : 'PostsNewFrm'
})(
  connect(null,{ createPost })(PostsNew)
);
