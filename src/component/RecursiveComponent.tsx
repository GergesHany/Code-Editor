import FileIcon from "./SVG/file";
import { IFile } from "../interfaces/index";
import RightArrowIcon from '../component/SVG/RightArrowIcon'

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({fileTree: {name, children}}: IProps) => {
  return (
    <div className="mb-2 ml-2 cursor-pointer">
        <div className="flex items-center mb-1">
          <RightArrowIcon />
          <span className="mr-2"> 
            <FileIcon />  
          </span>
          <span> {name} </span>
        </div>

        {children && children.map((child, idx) => (
          <RecursiveComponent fileTree={child} key={idx} />
        ))}
    </div>
  );
};

export default RecursiveComponent;