// import libs
import { connect } from 'react-redux'
import Templates from '../Templates'

// import components
import Page from './Page'

const mapStateToProps = state => {
  const {data, ...meta} = state.templates
  
  return {
    templates: data.map((templates) => new Templates(templates)),
    meta: Object.assign({}, meta)
  }
}

export default connect(mapStateToProps)(Page)
