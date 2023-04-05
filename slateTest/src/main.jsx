import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.old'
import Editor from './components/Editor'
import "./styles.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Editor/>
  </React.StrictMode>,
)
