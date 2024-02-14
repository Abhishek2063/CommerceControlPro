import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="p-8 rounded-lg">
        <Image
          src="/images/loader.svg"
          width={100}
          height={100}
          alt="Loader"
        />
      </div>
    </div>
  );
};

export default Loader;
