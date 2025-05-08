import FileIcon from "./SVG/file";
import IconImg from "./SVG/iconImg";
import { FILE_ICON_MAPPING } from "../constans/index"; 

interface IProps {
  filename: string;
  isFolder?: boolean;
  isOpen?: boolean;
}

/**
 * Component for rendering appropriate file or folder icons
 * @param {string} filename - Name of the file or folder
 * @param {boolean} isFolder - Whether the item is a folder
 * @param {boolean} isOpen - Whether the folder is open (only applicable for folders)
 */
const RenderFileIcon = ({ filename, isFolder, isOpen }: IProps) => {
  // Extract the extension or use the filename for special folders
  const getIconKey = () => {
    if (isFolder) {
      // Check if it's a special folder we have an icon for
      const folderName = filename.toLowerCase();
      if (FILE_ICON_MAPPING.has(folderName)) {
        return isOpen ? `${FILE_ICON_MAPPING.get(folderName)}-open`: FILE_ICON_MAPPING.get(folderName);
      }
      
      // Default folder icon
      return isOpen ? 'folder-default-open' : 'folder-default';
    }
    
    // For files, get the extension
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    
    // Return the mapped icon name or the extension itself if not found
    // return FILE_ICON_MAPPING.get(extension) || extension;
    if (!FILE_ICON_MAPPING.has(extension)) {
      return null;
    }
    return FILE_ICON_MAPPING.get(extension);
  };

  const iconKey = getIconKey();
  if (!iconKey) {
    return <FileIcon />
  }

  const iconPath = `/icons/${iconKey}.svg`;
  return <IconImg src={iconPath} />;
};

export default RenderFileIcon;