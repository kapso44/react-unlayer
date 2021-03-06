// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { templateAddRequest } from '../service'
import ReeValidate from 'ree-validate'

// import components
import Form from './components/Form'

class Page extends Component {
  static displayName = 'AddTemplate'
  static propTypes = {
    template: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new ReeValidate({
      name: 'required|min:3',
      description: 'required|min:10',
    })
    
    const template = this.props.template.toJson()
    
    this.state = {
      template,
      errors: this.validator.errors
    }
    
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  componentWillReceiveProps(nextProps) {
    const template = nextProps.template.toJson()
    
    if (!_.isEqual(this.state.template, template)) {
      this.setState({ template })
    }
    
  }
  
  handleChange(name, value) {
    const { errors } = this.validator
  
    this.setState({ template: { ...this.state.template, [name]: value} })
  
    errors.remove(name)
  
    this.validator.validate(name, value)
      .then(() => {
        this.setState({ errors })
      })
  }
  
  handleSubmit(e) {
    e.preventDefault()
    const template = this.state.template
    const { errors } = this.validator
    
    this.validator.validateAll(template)
      .then((success) => {
        if (success) {
          this.submit(template)
        } else {
          this.setState({ errors })
        }
      })
  }
  
  submit(template) {
    this.props.dispatch(templateAddRequest(template))
      .catch(({ error, statusCode }) => {
        const { errors } = this.validator
  
        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        }
  
        this.setState({ errors })
      })
  }
  
  render() {
    return <div className="col-sm-9 ml-sm-auto col-md-10 pt-3">
      <h1>Edit</h1>
      <Form {...this.state}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit} />
    </div>
  }
}

export default Page
