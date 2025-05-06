import { useSelector } from "react-redux"
import OpenedFilesBar from "./OpenedFilesBar"
import SyntaxHighlighter from "./SyntaxHighlighter"
import { RootState } from "../app/store"

const Preview = () => {
    const {clickedFile} = useSelector((state: RootState) => state.tree)
    return (
        <>
            <OpenedFilesBar />
            <SyntaxHighlighter content={clickedFile.fileContent} />
        </>
    )
}

export default Preview