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
    <div >
      <div className="flex h-screen w-screen">
        <ResizablePanel 
          LeftPanel={<div className="w-64 p-2"> 
            <RecursiveComponent fileTree={fileTree} />
            </div> 
          } 
          RightPanel={
            <div className="h-full rounded-3xl  mr-2">
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