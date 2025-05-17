import RecursiveComponent from "../src/component/RecursiveComponent";
import ResizablePanel from "../src/component/ResizablePanel";
import Preview from "./component/Preview";
import { useSelector } from "react-redux"
import { RootState } from "./app/store"
import WelcomeTap from "./component/WelcomeTap";
import ContextCreateFileFolder from "./component/ui/ContextCreateFileFolder";
import { Toaster } from "react-hot-toast";

function App() {

  const {openedFiles, fileTree, contextMenu} = useSelector((state: RootState) => state.tree)

  return (
    <div className="bg-black">
          {/* Toast notifications */}
          <Toaster position="top-center" reverseOrder={false} />
          
          <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-1000 via-blue-950 to-indigo-950">
 
              
              {/* Global context menu for creating files/folders */}
              {contextMenu.isVisible && (
                <ContextCreateFileFolder 
                  position={contextMenu.position} 
                  folderId={contextMenu.folderId} 
                />
              )}
              
              <ResizablePanel 
                LeftPanel={<div className="w-64 pt-2"> 
                  <RecursiveComponent fileTree={fileTree} />
                  </div> 
                } 
                RightPanel={
                  <div className="h-full">
                    {openedFiles.length ? <Preview /> : <WelcomeTap />}
                  </div>
                } 
                ShowLeftPanel={true}
              />
            </div>
    </div>
  );
}

export default App

