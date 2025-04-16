import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import OpenedFileBarTab from './OpenedFileBarTab';

const OpenedFilesBar = () => {
  
  const { openedFiles, clickedFile } = useSelector((state: RootState) => state.tree);

  return (

    <div>
      <div className='flex items-center'>
        {openedFiles.map(file => <OpenedFileBarTab key={file.id} file={file} />)}
      </div>
      {clickedFile.fileContent && (
        <div className="file-content">
          <p>{clickedFile.fileContent}</p>
        </div>
      )}
    </div>
  );
};

export default OpenedFilesBar;