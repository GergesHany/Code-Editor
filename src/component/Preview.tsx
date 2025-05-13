import { useSelector } from "react-redux"
import OpenedFilesBar from "./OpenedFilesBar"
import SyntaxHighlighter from "./SyntaxHighlighterEditor"
import { RootState } from "../app/store"
import { useState } from "react"
import ShowChatMessage from "./ShowChatMessage"
import { MessageType } from '../interfaces'

import { useDispatch } from "react-redux";
import { addMessage, clearMessages } from "../app/features/ChatMessage";

import { fetchCompletion } from "../services/openai";

// -------------------------- PHOTOS --------------------------
const AIPath = '/utils/ai.png';
const ZoomInOut = "utils/zoom-out.png";
const NewIcon = "utils/new.png";


const Preview = () => {
    const { clickedFile } = useSelector((state: RootState) => state.tree)
    const { messages } = useSelector((state: RootState) => state.chat)
    
    const dispatch = useDispatch();

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [ChatMessage, setChatMessage] = useState<string>("");
    const [chatSize, setchatSize] = useState<string>("w-[400px] h-[600px]");


    const handleOnClick = () => {
        setIsChatOpen(!isChatOpen);
    }

    const handleZoomToggle = () => {
        setchatSize(chatSize === "w-[400px] h-[600px]" ? "w-[700px] h-[850px]" : "w-[400px] h-[600px]");
    }

    const handleSendMessage = async () => {
        if (ChatMessage.trim() === "") return;
        
        const newMessage: MessageType = {
            id: Date.now().toString(),
            content: [
                ChatMessage
            ],
            sender: 'user'
        };

        dispatch(addMessage(newMessage));
        setChatMessage("");

        // AI responses
        const updatedMessages: MessageType[] = [
            ...messages,
            newMessage
        ];

        const responses = await fetchCompletion(updatedMessages);
        dispatch(addMessage({
            id: Date.now().toString(),
            content: [responses || ""],
            sender: 'model'
        }));
    }

    const handleClearMessages = () => {
        dispatch(clearMessages());
        setChatMessage("");
    }

    return (
        <>
            <OpenedFilesBar />
            <SyntaxHighlighter content={clickedFile.fileContent} />
            {!isChatOpen && <div onClick={handleOnClick}>
                <img src={AIPath} alt="AI" className="absolute bottom-5 mr-5 right-0 w-15 h-15 cursor-pointer" />              
            </div>}
            
            {isChatOpen && (
                <div className="fixed top-0 right-0 h-full flex items-center z-50">
                    <div 
                        className={`${chatSize} rounded-lg overflow-hidden relative shadow-2xl mr-4 bg-gradient-to-br from-slate-1000 via-blue-950 to-indigo-950 border border-indigo-700`}
                    >
                        <div className="absolute inset-0 bg-opacity-20">
                            <div className="h-full flex flex-col">
                               
                                <div className="flex justify-between items-center p-3 border-b border-gray-700">
                                    <h2 className="text-white text-lg font-semibold">AI Chat</h2>
                                    

                                    <div className="flex gap-2">
                                        <button onClick={handleClearMessages} className="text-white hover:text-gray-300"> 
                                            <img src={NewIcon} alt="AI" className="w-7 h-7" />
                                        </button>


                                        <button onClick={handleZoomToggle} className="text-white hover:text-gray-300"> 
                                            <img src={ZoomInOut} alt="AI" className="w-6 h-6" />
                                        </button>

          
                                        <button onClick={handleOnClick} className="text-white hover:text-gray-300 text-lg"> ✕ </button>
                                    </div>

                                </div>
                                
                                <div className="flex-1 overflow-y-auto p-3">

                                    {messages.map((message: MessageType) => (
                                        <ShowChatMessage key={message.id} message={message} />
                                    ))}

                                </div>
                                
                                <div className="p-3 border-t border-gray-700">
                                    <div className="flex gap-2">
                                        <input 
                                            type="text"
                                            placeholder="Type your message..."
                                            value={ChatMessage}
                                            onChange={(e) => setChatMessage(e.target.value)}
                                            className="flex-1 p-2 rounded-lg bg-black bg-opacity-50 text-white border border-gray-600 focus:outline-none focus:border-blue-500 text-sm"
                                        />
                                        
                                        <button 
                                            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                            onClick={handleSendMessage}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Preview