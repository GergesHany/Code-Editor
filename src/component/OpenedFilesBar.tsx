import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import OpenedFileBarTab from './OpenedFileBarTab';
import SyntaxHighlighter from './SyntaxHighlighter';

const OpenedFilesBar = () => {
  
  const { openedFiles, clickedFile } = useSelector((state: RootState) => state.tree);

  return (

    <div>
      <div className='flex items-center border-b-[1px] border-[#ffffff1f]'>
        {openedFiles.map(file => <OpenedFileBarTab key={file.id} file={file} />)}
      </div>
      {clickedFile.fileContent && (
        <div className="file-content">
          <SyntaxHighlighter content={clickedFile.fileContent} />
        </div>
      )}
    </div>
  );
};

export default OpenedFilesBar;