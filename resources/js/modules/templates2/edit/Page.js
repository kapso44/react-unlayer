// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { templateEditRequest, templateUpdateRequest } from '../service'
import ReeValidate from 'ree-validate'

// import components
import Form from './components/Form'

class Page extends Component {
  static displayName = 'EditTemplate'
  static propTypes = {
    match: PropTypes.object.isRequired,
    template: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new ReeValidate({
      name: 'required|min:3',
      description: 'required|min:10'
    })
    
    const template = this.props.template.toJson()
    
    this.state = {
      template,
      errors: this.validator.errors
    }
    
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.loadTemplate
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const template = nextProps.template.toJson()
    
    if (!_.isEqual(this.state.template, template)) {
      this.setState({ template })
    }
    
  }
  
  loadTemplate() {
    const { match, template, dispatch } = this.props
    
    if (!template.id) {
      dispatch(templateEditRequest(match.params.id))
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
          this.submitData(template)
        } else {
          this.setState({ errors })
        }
      })
  }
  
  submitData(template) {
    
    this.props.dispatch(templateUpdateRequest(template))
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
  
  renderForm() {
    const { template } = this.props
    if (template.id) {
      return <Form {...this.state}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit} />
    }
  }
  
  render() {
    return <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
      <h1>Edit</h1>
      { this.renderForm() }
    </main>
  }
}

export default Page
