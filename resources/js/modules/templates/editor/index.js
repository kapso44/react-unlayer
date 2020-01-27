// import libs
import { connect } from "react-redux"
import Templates from '../Templates'

// import components
import Editor from "./page"

const mapStateToProps = (state, router) => {
    const { params } = router.match
    const template = state.templates.data.find(template => template.id === Number(params.id))
    return {
      template: template ? new Templates(template) : new Templates({})
    }
  }

export default connect(mapStateToProps)(Editor)
