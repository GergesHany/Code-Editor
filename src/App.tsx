import RecursiveComponent from "../src/component/RecursiveComponent";
import { fileTree } from "../src/data/fileTree";
import OpenedFilesBar from "../src/component/OpenedFilesBar";

function App() {
  return (
    <div >
      <div className="flex h-screen">
        <div className="w-64 border-r border-white">
          <RecursiveComponent fileTree={fileTree} />
        </div>
        <OpenedFilesBar />
      </div>
    </div>
  );
}

export default App