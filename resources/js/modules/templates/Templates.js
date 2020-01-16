import moment from 'moment'
import Model from '../../utils/Model'

class Templates extends Model {
  constructor(props) {
    super(props)
    
    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.title = props.name || ''
    this.content = props.content || ''
    // this.published = props.createdAt || false
    this.publishedAt = props.createdAt ? moment(props.createdAt) : null

    // relate user model
  }
}

export default Templates
