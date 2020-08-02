import React from 'react';
import logo from './logo.svg';
import './App.scss';
import create_markup from './default_md.js';

const marked = require('marked');

function MarkdownEditor(props) {
  return (
    <textarea id="editor" cols="100" onInput={props.handleInput}>
      {props.markDown}
    </textarea>
  )
}

function RenderHTML(props) {
  return (
    <section dangerouslySetInnerHTML={{__html: props.content}}></section>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: create_markup()
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    // handles input from MarkdownEditor
    event.persist(); // event is asynchronous
    let new_markdown = marked(event.target.value);
    this.setState((state, props) => ({
      markdown: new_markdown
    }))
  }

  render() {
    return (
      <main>
        <MarkdownEditor markDown={this.state.markdown} handleInput={this.handleInput}/>
        <RenderHTML content={this.state.markdown}/>
      </main>
    )
  }
}

export default App;
