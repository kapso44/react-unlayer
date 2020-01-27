import moment from 'moment'
import Model from '../../utils/Model'

class Templates extends Model {
  constructor(props) {
    super(props)
    
    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.name = props.name || ''
    this.content = props.content || ''
    this.template = props.template || ''
    this.description = props.description || ''
    this.publishedAt = props.createdAt ? moment(props.createdAt) : null

    // relate user model
  }
}

export default Templates
