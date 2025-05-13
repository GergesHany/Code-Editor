import type React from "react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface SyntaxHighlighterProps {
  content: string
  language?: string
}

const SyntaxHighlighterChat: React.FC<SyntaxHighlighterProps> = ({ 
  content, 
  language = "javascript"
}) => {
  return (
    <div className="bg-gray-800 rounded-md">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <span className="text-xs text-gray-400">{language}</span>
        <button
          className="text-xs text-gray-400 hover:text-white transition-colors"
          onClick={() => {
            navigator.clipboard.writeText(content)
          }}
        >
          Copy
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 0.375rem 0.375rem',
          background: 'transparent'
        }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  )
}

export default SyntaxHighlighterChat;
