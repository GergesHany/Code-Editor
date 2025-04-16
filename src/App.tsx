import RecursiveComponent from "../src/component/RecursiveComponent";
import { fileTree } from "../src/data/fileTree";


function App() {
  return (
    <div className="my-2">
      <RecursiveComponent fileTree={fileTree} />
    </div>
  );
}

export default App