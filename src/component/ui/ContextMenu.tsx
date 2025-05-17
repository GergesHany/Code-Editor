import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../app/store";
import { setOpenedFiles } from "../../app/features/fileTreeSlice";


interface IProps {
  setShowMenu: (show: boolean) => void;
    position: {
    x: number; 
    y: number;  
  };  
}

const ContextMenu = ({ position, setShowMenu}: IProps) => {
  
  const menuRef = useRef<HTMLUListElement>(null);

  const { 
    openedFiles,
    tapIdToRemove,
   } = useSelector((state: RootState) => state.tree);

  const dispatch = useDispatch();

  const CloseAll = () => {
    setShowMenu(false);
    dispatch(setOpenedFiles([]));
  }

  const CloseOne = () => {
    setShowMenu(false);
    const updatedFiles = openedFiles.filter((file) => file.id !== tapIdToRemove);
    dispatch(setOpenedFiles(updatedFiles));
  }


  useEffect(() => {

    const handleClickOutSide = (e: MouseEvent) => {
      /*
       ** !menuRef.current.contains(e.target as Node) **
       that means that the click was outside of the menuRef element
      */
      if(menuRef.current && !menuRef.current.contains(e.target as Node)){
        setShowMenu(false);
      }
    }

    window.addEventListener("click", handleClickOutSide);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("click", handleClickOutSide);
    }
  }, [setShowMenu]);

  return (
    <div >
      <ul ref={menuRef} className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border border-indigo-700 text-white w-40 px-7 py-2 rounded-md z-50" style={{
          position: "absolute",
          top: position.y,
          left: position.x,
      }}>

      <li onClick={ CloseOne } className="cursor-pointer hover:bg-blue-900 p-1 rounded"> Close </li>
      <li onClick={ CloseAll } className="cursor-pointer hover:bg-blue-900 p-1 rounded"> Close All </li>

      </ul>  
    </div>
  );
};

export default ContextMenu;