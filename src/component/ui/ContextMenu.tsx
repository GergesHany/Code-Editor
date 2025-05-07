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
  
  const menuRef = useRef<HTMLDivElement>(null);

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
    <div ref={menuRef}>

      <ul className="bg-white text-black w-fit px-7 py-2 rounded-md" style={{
          position: "absolute",
          top: position.y,
          left: position.x,
      }}
        >
          <li onClick={CloseOne} className="cursor-pointer"> Close </li>
          <li onClick={CloseAll} className="cursor-pointer"> Close All </li>
      </ul>

    </div>
  );
};

export default ContextMenu;