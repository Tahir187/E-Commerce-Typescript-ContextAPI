import { loader } from "../utils/images";

const Loader = () => {
  return (
    <div className="container">
      <div className="loader flex justify-center items-center">
        <img src={loader} alt="" className="w-[100px]" />
      </div>
    </div>
  );
};

export default Loader;
