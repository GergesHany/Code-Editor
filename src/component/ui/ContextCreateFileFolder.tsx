import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createFile, createFolder, hideContextMenu } from "../../app/features/fileTreeSlice";

interface IProps {
  folderId: string;
  position: {
    x: number; 
    y: number;  
  };  
}

const ContextCreateFileFolder = ({ position, folderId }: IProps) => {
  const dispatch = useDispatch();
  const [showNameInput, setShowNameInput] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>("");
  const [isFile, setIsFile] = useState<boolean>(true);
  
  const createRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (createRef.current && !createRef.current.contains(e.target as Node)) {
        dispatch(hideContextMenu());
      }
    };
  
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch, folderId, position]);

  useEffect(() => {
    // Focus the input when it's shown
    if (showNameInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showNameInput]);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    if (isFile) {
      dispatch(createFile({ 
        folderId, 
        fileName: itemName.includes('.') ? itemName : `${itemName}.txt`,
        content: "" 
      }));
    } else {
      dispatch(createFolder({ 
        folderId, 
        folderName: itemName 
      }));
    }

    dispatch(hideContextMenu());
  };

  console.log("Rendering ContextCreateFileFolder, showNameInput:", showNameInput);

  return (
    <div>
      {!showNameInput ? (
        <div >
          <ul ref={createRef} className="bg-white text-black w-fit px-7 py-2 rounded-md z-50" style={{
              position: "absolute",
              top: position.y,
              left: position.x,
          }}>

          <li onClick={() => { setIsFile(true); setShowNameInput(true);}} className="cursor-pointer hover:bg-gray-200 p-1"> Create File </li>
          <li onClick={() => {  setIsFile(false); setShowNameInput(true);}} className="cursor-pointer hover:bg-gray-200 p-1"> Create Folder </li>

          </ul>  
        </div>
      ) : (
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border border-indigo-700 w-64 p-2 rounded-md z-50" style={{
            position: "absolute",
            top: position.y,
            left: position.x,
        }}>
          <form onSubmit={handleInputSubmit}>
            <input ref={inputRef} type="text" placeholder={isFile ? "Enter file name" : "Enter folder name"} className="w-full border p-1 mb-2 outline-none" value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />

            <div className="flex justify-end">
              <button type="button" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm rounded mr-2" onClick={() => dispatch(hideContextMenu())} > Cancel </button>
              <button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm rounded mr-2" > Create </button>
            </div>

          </form>
        </div>
      )}
    </div>
  );
};

export default ContextCreateFileFolder;