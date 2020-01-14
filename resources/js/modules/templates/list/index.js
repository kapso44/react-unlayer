// import libs
import { connect } from 'react-redux'
import Templates from '../Templates'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const {data, ...meta} = state.articles
  
  return {
    articles: data.map((article) => new Templates(article)),
    meta: Object.assign({}, meta)
  }
}

export default connect(mapStateToProps)(Page)
