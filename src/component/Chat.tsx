import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { MessageType } from '../interfaces';
import { addMessage, clearMessages } from "../app/features/ChatMessage";
import { fetchCompletion } from "../services/openai";
import { setClikedFile } from "../app/features/fileTreeSlice";
import ShowChatMessage from "./ShowChatMessage";
import SyntaxHighlighter from "./SyntaxHighlighterEditor";
import toast from "react-hot-toast";

// -------------------------- PHOTOS --------------------------
const ZoomInOut = "utils/zoom-out.png";
const NewIcon = "utils/new.png";

interface ChatProps {
  isChatOpen: boolean;
  onClose: () => void;
}

const Chat = ({ isChatOpen, onClose }: ChatProps) => {
  const { clickedFile } = useSelector((state: RootState) => state.tree);
  const { messages } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();

  const [ChatMessage, setChatMessage] = useState<string>("");
  const [chatSize, setChatSize] = useState<string>("w-full md:w-[450px] h-[70vh] md:h-[650px]");
  const [selectedMode, setSelectedMode] = useState<string>("Ask");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<{
    original: string;
    modified: string;
    isVisible: boolean;
  }>({
    original: "",
    modified: "",
    isVisible: false,
  });

  // reset the pending changes when the active tab id changes
  useEffect(() => {
    setPendingChanges({
      original: "",
      modified: "",
      isVisible: false,
    });
  }, [clickedFile.activeTabId]);

  // handle pending changes acceptance
  const handleAcceptChanges = () => {
    // First update the Redux state with the modified code
    dispatch(
      setClikedFile({
        activeTabId: clickedFile.activeTabId,
        filename: clickedFile.filename,
        fileContent: pendingChanges.modified,
      })
    );

    // Then clear the pending changes state
    setPendingChanges({
      original: "",
      modified: "",
      isVisible: false,
    });

    // Add a confirmation message to the chat
    dispatch(
      addMessage({
        id: Date.now().toString(),
        content: ["Changes accepted and applied successfully."],
        sender: "model",
      })
    );
  };

  // handle pending changes rejection
  const handleRejectChanges = () => {
    // Make sure we keep the original code
    dispatch(
      setClikedFile({
        activeTabId: clickedFile.activeTabId,
        filename: clickedFile.filename,
        fileContent: pendingChanges.original,
      })
    );

    // Then clear the pending changes state
    setPendingChanges({
      original: "",
      modified: "",
      isVisible: false,
    });

    // Add a confirmation message to the chat
    dispatch(
      addMessage({
        id: Date.now().toString(),
        content: ["Changes rejected. Original code restored."],
        sender: "model",
      })
    );
  };

  const handleZoomToggle = () => {
    setChatSize(
      chatSize === "w-full md:w-[450px] h-[70vh] md:h-[650px]" ? "w-full md:w-[700px] h-[85vh] md:h-[850px]" : "w-full md:w-[450px] h-[70vh] md:h-[650px]"
    );
  };

  // Ask the AI to answer the question
  const HandleAsk = async () => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content: [ChatMessage],
      sender: "user",
    };

    dispatch(addMessage(newMessage));
    setChatMessage("");

    // AI responses
    const updatedMessages: MessageType[] = [...messages, newMessage];

    const responses = await fetchCompletion(updatedMessages);
    setIsLoading(false);

    dispatch(
      addMessage({
        id: Date.now().toString(),
        content: [responses || ""],
        sender: "model",
      })
    );
  };

  // Agent the file content
  const HandleAgent = async () => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content: [ChatMessage],
      sender: "user",
      fileContent: clickedFile.fileContent,
    };

    dispatch(addMessage(newMessage));
    setChatMessage("");

    const updatedMessage = {
      ...newMessage,
      content: [
        newMessage.content[0] + " \n" + "Please make the edit on this code and return the code only, no other text or comments.",
      ],
    };

    // AI responses
    const updatedMessages: MessageType[] = [...messages, updatedMessage];

    const responses = await fetchCompletion(updatedMessages);
    setIsLoading(false);

    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const code = codeBlockRegex.exec(responses);

    let contentMessage = "I've prepared code changes. Please review and click Accept or Reject.";

    if (code) {
      // Save the original and modified code in state
      setPendingChanges({
        original: clickedFile.fileContent || "",
        modified: code[2],
        isVisible: true,
      });
    } else {
      contentMessage = "Sorry, I couldn't generate proper code. Please try again with more details.";
    }

    dispatch(
      addMessage({
        id: Date.now().toString(),
        content: [
          contentMessage
        ],
        sender: "model",
      })
    );
  };

  const handleSendMessage = async () => {
    if (ChatMessage.trim() === "") return;

    setIsLoading(true);
    if (selectedMode === "Ask") {
      HandleAsk();
    } else if (selectedMode === "Agent") {
      HandleAgent();
    }else{
      toast.error("Please select a correct mode.");
    }
  };

  const handleClearMessages = () => {
    dispatch(clearMessages());
    setChatMessage("");
  };

  if (!isChatOpen) return null;

  return (
    <>
      {/* Modal for showing pending changes with accept/reject buttons */}
      {pendingChanges.isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col border border-indigo-700">

            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-white text-lg font-semibold">Modified Code</h3>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="p-4 text-white text-sm">
                <SyntaxHighlighter content={pendingChanges.modified} />
              </div>
            </div>

            <div className="p-3 border-t border-gray-700 flex justify-end gap-3">
              <button className="px-4 py-2" onClick={handleAcceptChanges}> Accept </button>
              <button className="px-4 py-2" onClick={handleRejectChanges}> Reject </button>
            </div>

          </div>
        </div>
      )}

      <div className="fixed top-0 right-0 h-full w-full md:w-auto flex items-center z-50">
        <div
          className={`${chatSize} rounded-lg overflow-hidden relative shadow-2xl mx-2 md:mr-4 md:ml-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border border-indigo-700`}
        >
          <div className="absolute inset-0 bg-opacity-20">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center p-3 border-b border-gray-700">
                <h2 className="text-white text-lg font-semibold">AI Chat</h2>

                <div className="flex gap-2">
                  <button onClick={handleClearMessages} className="text-white hover:text-gray-300" aria-label="New chat">
                    <img src={NewIcon} alt="New chat" className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>

                  <button onClick={handleZoomToggle} className="text-white hover:text-gray-300" aria-label="Toggle size">
                    <img src={ZoomInOut} alt="Zoom" className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  <button onClick={onClose} className="text-white hover:text-gray-300 text-lg" aria-label="Close chat"> ✕ </button>
                </div>
              </div>

              {/* show messages */}
              <div className="flex-1 overflow-y-auto p-3">
                {messages.map((message) => (
                  <ShowChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                      <div className="text-white text-sm">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-100"></div>
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-gray-700">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={ChatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-black bg-opacity-50 text-white border border-gray-600 focus:outline-none focus:border-blue-500 text-sm"
                  />

                  <div className="flex gap-2">
                    <select
                      value={selectedMode}
                      onChange={(e) => setSelectedMode(e.target.value)}
                      className="px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 text-sm"
                    >
                      <option value="Ask">Ask</option>
                      <option value="Agent">Agent</option>
                    </select>

                    <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm" onClick={handleSendMessage} disabled={isLoading} >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat; 