import type React from "react"
import type { FC } from "react"
import type { MessageType } from "../interfaces"
import SyntaxHighlighterChat from "./SyntaxHighlighterChat"
import ReactMarkdown from 'react-markdown'
interface ChatMessageProps {
  message: MessageType
}

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

const ShowChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const isHuman = message.sender === "user"

  const renderContent = (content: string[]) => {
    return content.flatMap((text, contentIndex) => {
      // Check if the text contains a code block
      const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
      const parts: React.ReactNode[] = []
      let lastIndex = 0
      let match

      // If text is empty, don't process it
      if (!text.trim()) {
        return []
      }

      // Process code blocks
      while ((match = codeBlockRegex.exec(text)) !== null) {
        // Add text before the code block, if any
        if (match.index > lastIndex) {
          const textBeforeCode = text.slice(lastIndex, match.index).trim()
          if (textBeforeCode) {
            parts.push(
              <div key={`text-${contentIndex}-${lastIndex}`} className="whitespace-pre-wrap text-sm md:text-base mb-2">
                {isHuman ? textBeforeCode : <ReactMarkdown>{textBeforeCode}</ReactMarkdown>}
              </div>,
            )
          }
        }

        // Add the code block
        const code = match[2].trim()
        const language = match[1] || "text"
        parts.push(
          <div key={`code-${contentIndex}-${match.index}`} className="my-2 rounded-lg overflow-hidden">
            <SyntaxHighlighterChat content={code} language={language} />
          </div>,
        )

        lastIndex = match.index + match[0].length
      }

      // Add any remaining text after the last code block
      if (lastIndex < text.length) {
        const remainingText = text.slice(lastIndex).trim()
        if (remainingText) {
          parts.push(
            <div key={`text-${contentIndex}-${lastIndex}`} className="whitespace-pre-wrap text-sm md:text-base">
              {isHuman ? remainingText : <ReactMarkdown>{remainingText}</ReactMarkdown>}
            </div>,
          )
        }
      }

      return parts
    })
  }

  return (
    <div className={cn("flex w-full mb-4 animate-fade-in-up", isHuman ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 flex-shrink-0",
          isHuman
            ? "bg-blue-600 text-white rounded-tr-none"
            : "bg-chat-ai bg-opacity-100 text-white rounded-tl-none border border-chat-ai-accent/30",
        )}
      >
        {renderContent(message.content)}
      </div>
    </div>
  )
}

export default ShowChatMessage
