const content = () => {
  return (
    <div className="flex flex-col md:flex-row py-8 md:py-32 mt-4">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
        {/* {activeImg && ( */}
          <img
            // src={`${process.env.REACT_APP_BASEURL}/images/${activeImg.filename}`}
            // alt={`Car Image ${activeImg.id}`}
            className="w-2/3 h-auto aspect-square object-cover rounded-xl shadow-lg"
          />
        {/* )} */}
        <div className="flex flex-row justify-center mt-6">
          {/* {car &&
            car.carImages.map((image, index) => (
              <div
                key={index}
                className={`image-container cursor-pointer ${
                  activeImg === image
                    ? "border-2 border-violet-600"
                    : "border border-gray-300"
                } rounded-md h-16 w-16 mx-2`}
                onClick={() => handleImageClick(image)}
              > */}
                <img
                  // src={`${process.env.REACT_APP_BASEURL}/images/${image.filename}`}
                  // alt={`Car Image ${image._id}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            {/* ))} */}
        </div>
      </div>
    // </div>
  );
};

export default  content
