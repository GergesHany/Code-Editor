import IconImg from "./SVG/iconImg";

interface IProps {
  filename: string;
  isFolder?: boolean;
  isOpen?: boolean;
}

// Define the file extension to icon name mapping
const FILE_ICON_MAPPING = new Map([
  // JavaScript/TypeScript files
  ['js', 'javascript'],
  ['jsx', 'react'],
  ['ts', 'typescript'],
  ['tsx', 'react_ts'],
  
  // Image files
  ['png', 'image'],
  ['jpg', 'image'],
  ['jpeg', 'image'],
  ['gif', 'image'],
  ['svg', 'image'],
  
  // Special folders
  ['node_modules', 'folder-node'],
  ['public', 'folder-public'],
  ['src', 'folder-src'],
  ['dist', 'folder-dist'],
  ['components', 'folder-components'],
  ['assets', 'folder-assets'],
  
  // Default folder
  ['folder-default', 'folder-default'],
  ['folder-default-open', 'folder-default-open'],
  
  // Other common files
  ['html', 'html'],
  ['css', 'css'],
  ['json', 'json'],
  ['md', 'markdown'],
  ['icon', 'favicon'],
]);

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
    return FILE_ICON_MAPPING.get(extension) || extension;
  };

  const iconKey = getIconKey();
  const iconPath = `/public/icons/${iconKey}.svg`;

  return <IconImg src={iconPath} />;
};

export default RenderFileIcon;