interface IProps {
  src: string
}

const iconImg = ({src}: IProps) => {
  return (
    <img src={src} alt="Icon" className="w-6 h-6" />
  );
};

export default iconImg;