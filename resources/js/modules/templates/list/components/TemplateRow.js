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
    <td>{template.title}</td>
    <td>{template.content}</td>
    <td>{template.publishedAt && template.publishedAt.format('MMMM, DD YYYY')}</td>
    <td>
      <div className="btn-group" role="group" aria-label="Actions">
        {
          template.published
          ? <button className="btn btn-warning" onClick={() => togglePublish(template.id)}>Un Published</button>
          : <button className="btn btn-success" onClick={() => togglePublish(template.id)}>Publish</button>
        }
        <Link className="btn btn-primary" to={`articles/${template.id}/edit`}>Edit</Link>
        <button className="btn btn-danger" onClick={() => handleRemove(template.id)}>Delete</button>
      </div>
    </td>
  </tr>)
}

TemplateRow.displayName = displayName
TemplateRow.propTypes = propTypes

export default TemplateRow