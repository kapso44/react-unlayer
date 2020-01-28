// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { templateListRequest, templateUpdateRequest, templateRemoveRequest } from '../service'

// import components
// import ArticleRow from '../../article/pages/list/components/ArticleRow'
import TemplateRow from './components/TemplateRow'
import Pagination from './components/Pagination'
import { Link } from 'react-router-dom'

class Page extends Component {
  static displayName = 'TemplatesPage'
  static propTypes = {
    meta: PropTypes.object.isRequired,
    templates: PropTypes.array.isRequired,
    dispatch: PropTypes.func,
  }
  
  constructor(props) {
    super(props)
    this.togglePublish = this.togglePublish.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.pageChange = this.pageChange.bind(this)
  }
  
  UNSAFE_componentWillMount() {
    const { dispatch } = this.props
    dispatch(templateListRequest({}))
  }
  
  pageChange(pageNumber) {
    this.props.dispatch(templateListRequest({ pageNumber }))
  }
  
  togglePublish(id) {
    const template = this.props.templates.find(templates => (templates.id === id))
    
    if (!template)
      return
  
    template.published = !template.published
    if (template.published) {
      template.publishedAt = moment()
    } else {
      template.publishedAt = null
    }
    
    this.props.dispatch(templateUpdateRequest(template.toJson()))
  }
  
  handleRemove(id) {
    this.props.dispatch(templateRemoveRequest(id))
  }
  
  renderTemplates() {
    return this.props.templates.map((templates, index) => {
      return <TemplateRow key={index}
                template={templates}
                index={index}
                togglePublish={this.togglePublish}
                handleRemove={this.handleRemove}/>
    })
  }
  
  render() {
    return <main className="col-sm-12 m-sm-auto col-md-12 pt-3" role="main">
      <h1>Templates</h1>
      <table className="table table-responsive table-striped">
        <thead className="thead-inverse">
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Published At</th>
          <th><Link to='/templates1/create' className="btn btn-success">Add</Link></th>
        </tr>
        </thead>
        <tbody>
        { this.renderTemplates() }
        </tbody>
      </table>
      <Pagination meta={this.props.meta} onChange={this.pageChange}/>
      </main>
  }
}

export default Page
