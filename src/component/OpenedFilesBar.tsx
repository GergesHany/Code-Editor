import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import OpenedFileBarTab from './OpenedFileBarTab';
import { useState } from 'react';
import ContextMenu from './ui/ContextMenu';

const OpenedFilesBar = () => {
  
  const { openedFiles } = useSelector((state: RootState) => state.tree);

  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{x: number, y: number}>({x: 0, y: 0});

  return (
    <div className='flex items-center border-b-[1px] border-[#ffffff1f]'      
      onContextMenu={(e) => {
          setMenuPosition({x: e.clientX, y: e.clientY});
          setShowMenu(true);
        }}>

      {openedFiles.map(file => <OpenedFileBarTab key={file.id} file={file} />)}
    
      {showMenu && <ContextMenu position={menuPosition} setShowMenu={setShowMenu} />}
    </div>
  );
};

export default OpenedFilesBar;