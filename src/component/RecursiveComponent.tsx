import FileIcon from "./SVG/file";
import { IFile } from "../interfaces/index";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({fileTree}: IProps) => {
  return (
    <div className="mb-2 ml-3">
        <div className="flex items-center mb-1">
          <span className="mr-2"> 
            <FileIcon />  
          </span>
          <span> {fileTree.name} </span>
        </div>

        {fileTree.children && fileTree.children.map((child, idx) => (
          <RecursiveComponent fileTree={child} key={idx} />
        ))}
    </div>
  );
};

export default RecursiveComponent;