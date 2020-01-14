// import libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { templateListRequest, templateUpdateRequest, templateRemoveRequest } from '../service'

// import components
import ArticleRow from '../../article/pages/list/components/ArticleRow'
import TemplateRow from './components/TemplateRow'
import Pagination from './components/Pagination'
import { Link } from 'react-router-dom'

class Page extends Component {
  static displayName = 'ArticlesPage'
  static propTypes = {
    meta: PropTypes.object,
    articles: PropTypes.array,
    dispatch: PropTypes.func,
  }
  
  constructor(props) {
    super(props)
    console.log('test');
    console.log(this);
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
    const template = this.props.articles.find(article => (article.id === id))
    
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
    return this.props.articles.map((article, index) => {
      return <ArticleRow key={index}
                         article={article}
                         index={index}
                         togglePublish={this.togglePublish}
                         handleRemove={this.handleRemove}/>
    })
  }
  
  render() {
    return <main className="col-sm-9 m-sm-auto col-md-12 pt-3" role="main">
      <h1>templates</h1>
      <table className="table table-responsive table-striped">
        <thead className="thead-inverse">
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Published At</th>
          <th><Link to='/articles/create' className="btn btn-success">Add</Link></th>
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
