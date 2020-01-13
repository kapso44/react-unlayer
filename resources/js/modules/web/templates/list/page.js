import React, { Component } from "react"
import PropTypes from "prop-types"
import EmailEditor from 'react-email-editor'

// import components
import Header from "../../pages/home/components/Header"

class Page extends Component {
  static displayName = "Template Editor"
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return <div>
      <Header/>
      <EmailEditor
        ref={designer => this.designer = designer}
      />
    </div>
  }
}

export default Page


// class App extends Component {
//   render() {
//     return <div>
//       <h1>react-email-editor Demo</h1>

//       <div>
//         <button onClick={this.exportHtml}>Export HTML</button>
//       </div>

      
//     </div>
//   }

//   exportHtml = () => {
//     this.designer.exportHtml(html => {
//     })
//   }
// }

// render(<App />, document.getElementById('app'))