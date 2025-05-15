import { useSelector } from "react-redux"
import OpenedFilesBar from "./OpenedFilesBar"
import SyntaxHighlighter from "./SyntaxHighlighterEditor"
import { RootState } from "../app/store"
import { useState } from "react"
import Chat from "./Chat"

// -------------------------- PHOTOS --------------------------
const AIPath = '/utils/ai.png';

const Preview = () => {
    const { clickedFile } = useSelector((state: RootState) => state.tree)
    const [isChatOpen, setIsChatOpen] = useState(false)

    const handleOnClick = () => {
        setIsChatOpen(!isChatOpen);
    }

    return (
        <>
            <OpenedFilesBar />
            <SyntaxHighlighter content={clickedFile.fileContent} />
            
            {!isChatOpen && <div onClick={handleOnClick}>
                <img src={AIPath} alt="AI" className="fixed bottom-5 right-5 w-12 h-12 cursor-pointer z-40" />              
            </div>}
            
            <Chat isChatOpen={isChatOpen} onClose={handleOnClick} />
        </>
    )
}

export default Preview