import React from 'react'
import Editor from '@monaco-editor/react';

const onChangeCode = (code) => {
    console.log(code);
}

const CodeEditor = () => {
  return (
    <div>
      <Editor 
        height="90vh" 
        language={"javascript" }
        theme='vs-dark'
        onChange={onChangeCode}
      />
    </div>
  )
}

export default CodeEditor
