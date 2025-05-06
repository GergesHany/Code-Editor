import ReactSyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface IProps {
    content: string | undefined;
}

const SyntaxHighlighter = ({content}: IProps) => {
        return (
            <ReactSyntaxHighlighter 
                language="javascript" 
                style={atomOneDark}
                customStyle={{
                    background: "transparent",
                    width: "100%",
                    maxHeight: "100vh",
                    overflowX: "auto",
                    fontSize: "14px",
                    padding: "10px",
                    borderRadius: "5px",
                    margin: "10px 0"
                }}
                showLineNumbers
            >
                {content || ''}
            </ReactSyntaxHighlighter>
        );
}

export default SyntaxHighlighter