import React, { Component } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types"
import styled, { createGlobalStyle } from 'styled-components'
import { contentUpdateRequest, templateEditRequest } from '../service'

// import components
import Header from "../../web/pages/home/components/Header"
import Example from '../src'

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

class Page extends Component {
  static displayName = "Template Editor"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    template: PropTypes.object,
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    const {match, dispatch } = this.props
    dispatch(templateEditRequest(match.params.id))
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const template = nextProps.template.toJson()
    this.setState({ template })
  }

  loadTemplate() {
    const { match, template, dispatch } = this.props
    
    if (!template.id) {
      dispatch(templateEditRequest(match.params.id))
    }
  }

  handleChange(name, value) {
    const { errors } = this.validator
    
    this.setState({ template: { ...this.state.template, [name]: value} })
    console.log()
    errors.remove(name)
    
    this.validator.validate(name, value)
      .then(() => {
        this.setState({ errors })
      })
  }

  addTemplate(addData = '') {
    var template = this.props.template;
    
    this.editor.exportHtml(data => {
      const { design, html } = data
      template.template = addData === '' ? design : Object.assign(design, addData)
      template.content = html
      this.props.dispatch(contentUpdateRequest(template))
      .catch(({ error, statusCode }) => {
        const { errors } = this.validator
        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        }
        this.setState({ errors })
      })
    })

    
  }

  onLoad = () => {
    // this.editor.addEventListener('onDesignLoad', this.onDesignLoad)
    unlayer.addEventListener('design:updated', function(data) {
      // Design is updated by the user
      // var type = data.type; // body, row, content
      // var item = data.item;
      var changes = data.changes;
      // console.log('design:updated', type, item, changes);
      this.addTemplate(changes);
    }.bind(this))
    
    var templateJson = this.props.template.template ? JSON.parse(this.props.template.template) : ''
    this.editor.loadDesign(templateJson)
  }

  saveDesign = () => {
    this.addTemplate();
    toast.success("Saved Successfully", {
      autoClose: 5000,
      hideProgressBar: false,
    })
  }

  exportHtml = () => {
    this.editor.exportHtml(data => {
      const { design, html } = data
      console.log('exportHtml', html)
      alert("Output HTML has been logged in your developer console.")
    })
  }

  onDesignLoad = (data) => {
    // console.log('onDesignLoad', data)
  }

  render() {
    return <div>
      <Header/>
      <GlobalStyle />
      <Container>
          <Bar>
          <h1>Email Template Editor - {this.props.template.name}</h1>

            <button onClick={this.saveDesign}>Save Design</button>
            <button onClick={this.notify}>Export HTML</button>
          </Bar>

          <Example
            ref={editor => this.editor = editor}
            onLoad={this.onLoad}
            onDesignLoad={this.onDesignLoad}
          />

        {/* <EmailEditor
          ref={designer => this.designer = designer}
          onLoad={this.onLoad}
          onDesignLoad={this.onDesignLoad}
        /> */}

      </Container>
      <ToastContainer/>
    </div>
  }
}

export default (Page);