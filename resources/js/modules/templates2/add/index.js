import { connect } from 'react-redux'
import Templates from '../Templates'

// import components
import Page from './Page'

const mapStateToProps = () => {
  const template = new Templates({})
  return {
    template
  }
}

export default connect(mapStateToProps)(Page)
