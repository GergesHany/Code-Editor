import { IFile } from "../interfaces/index";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import { setClikedFile } from "../app/features/fileTreeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface IProps {
  file: IFile;
}

const OpenedFileBarTab = ({file}: IProps) => {

  const { activeTabId } = useSelector((state: RootState) => state.tree);

  const dispatch = useDispatch();
  const onClick = () => {
    const {name, content} = file;
    dispatch(setClikedFile({
      filename: name,
      fileContent: content,
    }));
  }

  return (
    <div className={`flex items-center p-2 ${file.id === activeTabId ? "border-t-2 border-purple-500" : "border-t-2 border-transparent"}`} onClick={onClick}>
      <RenderFileIcon filename={file.name} />
      <span className="cursor-pointer duration-300 flex justify-center items-center w-fit mx-2 p-1 rounded-md">
          {file.name}
      </span>
      <CloseIcon />
    </div>
  );
};

export default OpenedFileBarTab;