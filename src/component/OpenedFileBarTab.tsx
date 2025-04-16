import { IFile } from "../interfaces/index";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import { setClikedFile } from "../app/features/fileTreeSlice";
import { useDispatch } from "react-redux";

interface IProps {
  file: IFile;
}

const OpenedFileBarTab = ({file}: IProps) => {

  const dispatch = useDispatch();
  const onClick = () => {
    const {name, content} = file;
    dispatch(setClikedFile({
      filename: name,
      fileContent: content,
    }));
  }

  return (
    <div className="flex items-center border-2 p-2" onClick={onClick}>   
      <RenderFileIcon filename={file.name} />
      <span className="cursor-pointer duration-300 flex justify-center items-center w-fit mx-2 p-1 rounded-md">
          {file.name}
      </span>
      <CloseIcon />
    </div>
  );
};

export default OpenedFileBarTab;