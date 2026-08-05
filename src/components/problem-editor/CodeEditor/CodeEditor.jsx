import React from 'react';
import Editor from '@monaco-editor/react';

export const CodeEditor = ({ 
  language, 
  value, 
  onChange, 
  onRun, 
  isEditing,
  label 
}) => {
  const editorRef = React.useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <button
          onClick={onRun}
          disabled={!isEditing}
          className={`
            px-3 py-1 text-sm font-medium rounded-lg transition-colors
            ${isEditing 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }
          `}
        >
          ▶ Run
        </button>
      </div>
      <Editor
        height="300px"
        language={language}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          tabSize: 2,
          wordWrap: 'on',
          readOnly: !isEditing,
          automaticLayout: true,
        }}
      />
    </div>
  );
};