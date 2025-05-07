import { useDispatch, useSelector } from 'react-redux';
import { setClikedFile } from '../app/features/fileTreeSlice';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism-tomorrow.css';
import { RootState } from '../app/store';

interface IProps {
    content: string | undefined;
}

const codeStyle = {
    fontFamily: '"Fira code", "Fira Mono", monospace',
    fontSize: 14,
    backgroundColor: 'transparent',
    minHeight: 'calc(100vh - 35px)',
    color: '#fff'
};

const SyntaxHighlighter = ({content}: IProps) => {
    const dispatch = useDispatch();
    const { clickedFile } = useSelector((state: RootState) => state.tree);

    const handleContentChange = (code: string) => {
        dispatch(setClikedFile({
            activeTabId: clickedFile.activeTabId,
            filename: clickedFile.filename,
            fileContent: code,
        }));
    };

    return (
        <Editor
            value={content || ''}
            onValueChange={handleContentChange}
            highlight={code => highlight(code, languages.tsx, 'tsx')}
            padding={10}
            style={codeStyle}
            className="w-full"
        />
    );
};

export default SyntaxHighlighter;