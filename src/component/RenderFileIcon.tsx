import IconImg from "./SVG/iconImg";

interface IProps {
  filename: string;
}


const RenderFileIcon = ({filename}: IProps) => {
  const extension = filename.split('.').pop(); // Get the file extension  

  if (extension === 'jsx') return <IconImg src="/public/icons/react.svg" />;
  if (extension === 'tsx') return <IconImg src="/public/icons/react_ts.svg" />;

  return (
    <IconImg src={`/public/icons/${extension}.svg`} />
  );
};

export default RenderFileIcon;