interface IProps {
  src: string
  className?: string
}

const iconImg = ({src, className}: IProps) => {
  return (
    <img src={src} alt="icon" className={`w-6 h-6 mr-1 select-none ${className}`} />
  );
};

export default iconImg;