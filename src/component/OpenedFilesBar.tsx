import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import OpenedFileBarTab from './OpenedFileBarTab';
import SyntaxHighlighter from './SyntaxHighlighter';
import { useState } from 'react';
import ContextMenu from './ui/ContextMenu';

const OpenedFilesBar = () => {
  
  const { openedFiles, clickedFile } = useSelector((state: RootState) => state.tree);


  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{x: number, y: number}>({x: 0, y: 0});

  return (
    <div>
      <div className='flex items-center border-b-[1px] border-[#ffffff1f]'      
      
      onContextMenu={(e) => {
          e.preventDefault();
          setMenuPosition({x: e.clientX, y: e.clientY});
          setShowMenu(true);
        }}>

        {openedFiles.map(file => <OpenedFileBarTab key={file.id} file={file} />)}
      
      </div>
      
      {clickedFile.fileContent && (
        <div className="file-content h-[calc(100vh-35px)] overflow-y-auto">
          <SyntaxHighlighter content={clickedFile.fileContent} />
        </div>
      )}

      {showMenu && <ContextMenu position={menuPosition} setShowMenu={setShowMenu} />}
    </div>
  );
};

export default OpenedFilesBar;