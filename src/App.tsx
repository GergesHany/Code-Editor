import RecursiveComponent from "../src/component/RecursiveComponent";
import { fileTree } from "../src/data/fileTree";
import ResizablePanel from "../src/component/ResizablePanel";
import Preview from "./component/Preview";
import { useSelector } from "react-redux"
import { RootState } from "./app/store"
import WelcomeTap from "./component/WelcomeTap";

function App() {

  const {openedFiles} = useSelector((state: RootState) => state.tree)

  return (
    <div className="bg-black">
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-1000 via-blue-950 to-indigo-950">
        <ResizablePanel 
          LeftPanel={<div className="w-64 p-2 rounded-2xl"> 
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

