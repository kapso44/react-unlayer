import React from 'react'
import PropTypes from 'prop-types'
import MyEditor from '../../../../common/wysiwyg-editor/index'

import styled, { createGlobalStyle } from 'styled-components'

// import components
import Header from "../../../web/pages/home/components/Header"
import Example from '../../src'
import sample from '../sample.json'

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

const Bar = styled.div`
  flex: 1;
  background-color: #61dafb;
  color: #000;
  padding: 10px;
  display: flex;
  max-height: 60px;

  h1 {
    flex: 1;
    font-size: 2rem;
    text-align: left;
    font-weight: 500;
    line-height: 1.2;
    color: white;
    margin-bottom: 0.5rem
  }

  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #FFF;
    border: 0px;
    max-width: 150px;
    cursor: pointer;
  }
`
const displayName = 'TemplateFrom'
const propTypes = {
  template: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onLoad: PropTypes.func,
  saveDesign: PropTypes.func,
  onDesignLoad: PropTypes.func
}

const Form = ({ template, errors, onChange, onSubmit, onLoad, saveDesign, onDesignLoad }) => {
  
  function handleChange(name, value) {
    if (value !== template[name]) {
      onChange(name, value)
    }
  }

  return <div> 
      <Header/>
      <GlobalStyle />
      <Container>
        <Bar>
          <button onClick={e => saveDesign(e)}>Save Design</button>
        </Bar>  
          {/* <button onClick={exportHtml()}>Export HTML</button> */}
          <form onSubmit={e => onSubmit(e)}>
            <Example
              ref={editor => template.editor = editor}
              onLoad={e => onLoad(sample)}
              onDesignLoad={e => onDesignLoad(e)}
            />
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
                <label htmlFor="content" className="col-sm-2 col-form-label">Content</label>
                <div className="col-sm-10">
                  <MyEditor id="content" value={template.content} onChange={e => handleChange('content', e)} />
                  {errors.has('content') && <div className="invalid-feedback">{errors.first('content')}</div>}
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
