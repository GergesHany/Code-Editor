import { useState } from "react";
import { IFile } from "../interfaces/index";
import RightArrowIcon from '../component/SVG/RightArrowIcon'
import BottomArrowIcon from '../component/SVG/BottomArrowIcon'
import RenderFileIcon from "./RenderFileIcon";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({fileTree: {name, isFolder, children}}: IProps) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(prev => !prev); 

  return (
    <div className="mb-2 ml-2 cursor-pointer">
        <div className="flex items-center mb-1">
          {isFolder ? (
            <div onClick={toggle} className="flex items-center"> 
              {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
              <RenderFileIcon filename={name} isFolder={isFolder} isOpen={isOpen}  />
              <span className="ml-2"> {name} </span>
            </div>
          ) : 
          (
            <div className="flex items-center mb-1 mr-2">
              <RenderFileIcon filename={name} />
              <span className="ml-2"> {name} </span>
            </div>
          )}

        </div>

        {isOpen && isFolder ? (
          <div className="ml-4">
            {children && children.map((child, idx) => (<RecursiveComponent fileTree={child} key={idx} /> ))}
          </div>
        ) : null}

    </div>
  );
};

export default RecursiveComponent;