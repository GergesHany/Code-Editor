import { IFile } from "../interfaces/index";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import { setClikedFile } from "../app/features/fileTreeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setOpenedFiles } from "../app/features/fileTreeSlice";

interface IProps {
  file: IFile;
}

const OpenedFileBarTab = ({file}: IProps) => {

  const { 
    openedFiles,
    clickedFile: {activeTabId},
   } = useSelector((state: RootState) => state.tree);

  const dispatch = useDispatch();


  const onClick = () => {
    const {name, content, id} = file;
    dispatch(setClikedFile({
      activeTabId: id,
      filename: name,
      fileContent: content || "",
    }));
  }

  const onRemove = (id: string) => {
    const updatedFiles = openedFiles.filter((file) => file.id !== id);
    dispatch(setOpenedFiles(updatedFiles));
    if (updatedFiles.length > 0) {
      const {id, name, content} = updatedFiles[updatedFiles.length - 1];
      dispatch(setClikedFile({
        activeTabId: id || "",
        filename: name || "",
        fileContent: content || "",
      }));
    }else{
      // If no files are opened, set the clicked file to default values
      dispatch(setOpenedFiles([]));
      dispatch(setClikedFile({ activeTabId: "", filename: "", fileContent: "", }));
    }
  }

  return (
    <div className={`flex items-center p-2 ${file.id === activeTabId ? "border-t-2 border-purple-500" : "border-t-2 border-transparent"}`} onClick={onClick}>
      
      <RenderFileIcon filename={file.name} />
        <span className="cursor-pointer duration-300 flex justify-center items-center w-fit mx-2 p-1 rounded-md">
            {file.name}
        </span>
        <span 
          className="cursor-pointer hover:bg-[#64646473] duration-300 flex justify-center items-center w-fit mr-2 p-1 rounded-md"
          onClick={(e) => {
            e.stopPropagation()
            onRemove(file.id)}
          }
        >
           <CloseIcon />
        </span>

    </div>
  );
};

export default OpenedFileBarTab;