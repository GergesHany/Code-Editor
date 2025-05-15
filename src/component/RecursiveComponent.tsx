import { useState } from "react";
import { IFile } from "../interfaces/index";
import RightArrowIcon from '../component/SVG/RightArrowIcon';
import BottomArrowIcon from '../component/SVG/BottomArrowIcon';
import RenderFileIcon from "./RenderFileIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setOpenedFiles, setClikedFile, showContextMenu } from "../app/features/fileTreeSlice";
import { doesFileObjExist } from "../utils/functions";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const { id, name, isFolder, children, content } = fileTree;

  const dispatch = useDispatch();
  const { openedFiles } = useSelector((state: RootState) => state.tree);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(prev => !prev);

  const handleFileClick = () => {
    dispatch(setClikedFile({
      activeTabId: id,
      filename: name,
      fileContent: content || "",
    }));

    const fileExists = doesFileObjExist(openedFiles, id);
    if (fileExists) {
      return;
    }
    dispatch(setOpenedFiles([...openedFiles, fileTree]));
  }

  const handleContextMenuFolder = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default context menu from showing
    dispatch(showContextMenu({
      position: { x: e.clientX, y: e.clientY },
      folderId: id
    }));
  };

  return (
    <div className="mb-2 ml-2">
      <div className="flex items-center mb-1">
        {isFolder ? (
          <div className="flex items-center cursor-pointer" onClick={toggle} onContextMenu={(e) => {
            handleContextMenuFolder(e);
          }} >
            {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
            <RenderFileIcon filename={name} isFolder={isFolder} isOpen={isOpen} />
            <span className="ml-2" onContextMenu={handleContextMenuFolder} >
              {name}
            </span>
          </div>
        ) : (
          <div className="flex items-center mb-1 mr-2 cursor-pointer" onClick={handleFileClick}>
            <RenderFileIcon filename={name} />
            <span className="ml-2">{name}</span>
          </div>
        )}
      </div>

      {isOpen && isFolder && (
        <div className="ml-4">
          {children &&
            children.map((child, idx) => (
              <RecursiveComponent fileTree={child} key={child.id || idx} />
            ))}
        </div>
      )}
    </div>
  );
};

export default RecursiveComponent;