import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const displayName = 'TemplateRow'
const propTypes = {
  index: PropTypes.number.isRequired,
  template: PropTypes.object.isRequired,
  togglePublish: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

const TemplateRow = ({ index, template, togglePublish, handleRemove }) => {
  return (<tr key={index}>
    <th scope="row">{index+1}</th>
    <td>{template.name}</td>
    <td>{template.description}</td>
    <td>{template.publishedAt && template.publishedAt.format('MMMM, DD YYYY')}</td>
    <td>
      <div className="btn-group" role="group" aria-label="Actions">
        <Link className="btn btn-success mr-2" to={`templates/${template.id}/editor`}>Add/Edit Template</Link>
        <Link className="btn btn-primary mr-2" to={`template/${template.id}/edit`}>Edit</Link>
        <button className="btn btn-danger mr-2" onClick={() => handleRemove(template.id)}>Delete</button>
      </div>
    </td>
  </tr>)
}

TemplateRow.displayName = displayName
TemplateRow.propTypes = propTypes

export default TemplateRow