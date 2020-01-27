import React, {Component} from 'react'
import Script from 'react-load-script'

export default class extends Component {
  render() {
    let {
      props: {
        minHeight = 700,
        style = {},
      }
    } = this

    return (
      <div className="col-sm-12 col-md-12" style={{
        flex: 1,
        display: 'flex',
        minHeight: minHeight,
      }}>
        <Script
          url="https://editor.unlayer.com/embed.js?1"
          onLoad={this.unlayerReady}
        />

        <div
          id="editor"
          style={{...style, flex: 1}}
        />
      </div>
    )
  }

  unlayerReady = () => {
    const options = (this.props.options || {})

    if (this.props.projectId) {
      options.projectId = this.props.projectId
    }

    if (this.props.tools) {
      options.tools = this.props.tools
    }
    
    if (this.props.appearance) {
      options.appearance = this.props.appearance
    }

    if (this.props.locale) {
      options.locale = this.props.locale
    }
    
    unlayer.init({
      ...options,
      id: 'editor',
      projectId: 3794,
      // projectId: 3758,
      // projectId: 3812,
      displayMode: 'email',
      appearance: {
        theme: 'light',
        panels: {
          tools: {
            dock: 'left'
          }
        }
      },
      designTags: {
        business_name: "TargetBay Inc",
        current_user_name: "Elon Musk"
      },
      customJS: "http://cdn.muicss.com/mui-0.9.28/js/mui.min.js"
    })


    // unlayer.addEventListener('design:updated', function(data) {
    //   // Design is updated by the user
    //   var type = data.type; // body, row, content
    //   var item = data.item;
    //   var changes = data.changes;
    //   console.log('data', data);
    //   console.log('design:updated', type, item, changes, data);
    // })

    // All properties starting with on[Name] are registered as event listeners.
    for (const [key, value] of Object.entries(this.props)) {
      if (/^on/.test(key) && key != 'onLoad') {
        this.addEventListener(key, value)
      }
    }

    const { onLoad } = this.props
    onLoad && onLoad()
  }

  registerCallback = (type, callback) => {
    unlayer.registerCallback(type, callback)
  }

  addEventListener = (type, callback) => {
    unlayer.addEventListener(type, callback)
  }

  loadDesign = (design) => {
    unlayer.loadDesign(design)
  }

  saveDesign = (callback) => {
    unlayer.saveDesign(callback)
  }

  exportHtml = (callback) => {
    unlayer.exportHtml(callback)
  }

  setMergeTags = (mergeTags) => {
    unlayer.setMergeTags(mergeTags)
  }
}