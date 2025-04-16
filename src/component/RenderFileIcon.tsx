import IconImg from "./SVG/iconImg";

interface IProps {
  filename: string;
  isFolder?: boolean;
  isOpen?: boolean;
}

const mapping = new Map();
mapping.set('js', 'javascript');
mapping.set('jsx', 'react');
mapping.set('ts', 'typescript');
mapping.set('tsx', 'react_ts');

mapping.set('png', 'image');
mapping.set('jpg', 'image');
mapping.set('gif', 'image');
mapping.set('node_modules', 'folder-node');
mapping.set('public', 'folder-public');
mapping.set('src', 'folder-src');
mapping.set('folder-default', 'folder-default');
mapping.set('icon', 'facicon');

mapping.set('html', 'html');
mapping.set('css', 'css');
mapping.set('json', 'json');



const RenderFileIcon = ({filename, isFolder, isOpen}: IProps) => {
  let extension = filename.split('.').pop(); // Get the file extension  

  if (isFolder && !mapping.has(extension)) {
    if (isOpen) {
      extension = 'folder-default-open';
    }
    else {
      extension = 'folder-default';
    }
  }else{
    extension = mapping.get(extension);
  }

  if (isFolder && isOpen) {
    return (
      <IconImg src={`/public/icons/${extension}-open.svg`} />
    );
  }

  return (
    <IconImg src={`/public/icons/${extension}.svg`} />
  );
};

export default RenderFileIcon;