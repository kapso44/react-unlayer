import React from 'react'
import PropTypes from 'prop-types'
import MyEditor from '../../../../common/wysiwyg-editor/index'

import styled, { createGlobalStyle } from 'styled-components'

// import components
import Header from "../../../web/pages/home/components/Header"

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }

  #demo {
    height: 100%;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`
const displayName = 'TemplateFrom'
const propTypes = {
  template: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const Form = ({ template, errors, onChange, onSubmit }) => {
  
  function handleChange(name, value) {
    if (value !== template[name]) {
      onChange(name, value)
    }
  }

  return <div> 
      <Header/>
      <GlobalStyle />
      <Container>
          <form onSubmit={e => onSubmit(e)}>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">Title</label>
              <div className="col-sm-10">
                <input type="text"
                      id="title"
                      name="name"
                      className={`form-control ${errors.has('name') && 'is-invalid'}`}
                      placeholder="title"
                      value={template.name || ''}
                      onChange={e => handleChange(e.target.name, e.target.value)} />
                {errors.has('name') && <div className="invalid-feedback">{errors.first('name')}</div>}
              </div>
            </div>
            <div className="form-group row">
                <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                  <MyEditor id="description" value={template.description} onChange={e => handleChange('description', e)} />
                  {errors.has('description') && <div className="invalid-feedback">{errors.first('description')}</div>}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10 ml-auto">
                  <button disabled={errors.any()} type="submit" className="btn btn-primary">Update</button>
                </div>
              </div>
          </form>
      </Container>
    </div>
    {/* <div className="form-group row">
      <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
      <div className="col-sm-10">
        <textarea id="description"
                  name="description"
                  className={`form-control ${errors.has('description') && 'is-invalid'}`}
                  rows="3"
                  placeholder="Description"
                  value={template.description}
                  onChange={e => handleChange(e.target.name, e.target.value)} />
        {errors.has('description') && <div className="invalid-feedback">{errors.first('description')}</div>}
      </div>
    </div> */}
    
}

Form.displayName = displayName
Form.propTypes = propTypes

export default Form
