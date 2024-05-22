import { useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import imagePlaceHolder from "../../assets/image_placeHolder.png";
import { addImage, fetchImages } from '../../features/imageGallery/imageGallerySlice';

function AddImageForm() {
  const [images, setImages] = useState([]);
  const imageField = useRef();


  const dispatch = useDispatch();

  const formHandler = async (e) => {
    e.preventDefault();

    if (images.length) {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
  
      // for (const [key, value] of formData) {
      //   console.log(`${key}: ${value}`)
      // }

      try {
        const result1 = await dispatch(addImage(formData));
        setImages([])
        console.log('result1 = ', result1);
        const result2 = await dispatch(fetchImages());
        console.log('result2 = ', result2);
      } catch (err) {
        // By default, Promise rejected হলে Redux নিজে error Handle করবে. যার কারণে কোনো প্রকার error পাবোই না
        // catch block এ আসবেই না
        console.log('error = ', err);
        // এই Promise গুলোর জন্য error Redux নিজে Handle করবে.
      }

    }
  }


  const imageFieldHandler = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleDelete = (indexToDelete) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToDelete)
    );
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files).filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
    );
    if (files.length) {
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <div className="m-2 p-5 border-solid border-2 border-gray-200 rounded-md mt-4">
        <h2 className="font-bold text-lg text-center">Add an Image</h2>

        <form className="max-w-4xl m-auto" onSubmit={formHandler}>
          <div>
            <label
              className={`bg-[#F5F5F5] py-[87px] flex justify-center items-center w-full rounded-lg cursor-pointer ${
                images.length ? "bg-green-400" : ""
              }`}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <div className="flex flex-col justify-center items-center gap-y-[10px]">
                <img
                  src={imagePlaceHolder}
                  alt="image_placeHolder"
                  className="w-[55px] h-[55px]"
                />
                <div className="text-xs font-normal text-[#757575] leading-[14.32px]">
                  Add article cover image...
                </div>
                <div className="text-xs font-normal  leading-[14.32px]">
                  <span className="font-semibold">Chosen file:</span>
                  {images.length ? "uploded" : "No Image chosen yet"}
                </div>
                <div className="px-[22px] py-[6px] bg-gradient-to-b from-[#D13F96] to-[#833586]  text-white rounded-[5px] text-xs font-bold">
                  Browse Image
                </div>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".jpg, .png, .webp, .jpeg"
                onChange={imageFieldHandler}
                multiple
              />
            </label>
          </div>

          <button
            type="submit"
            className="text-lg bg-black hover:bg-gray-800 text-white px-14 py-0.5 cursor-pointer rounded-sm"
          >submit</button>
        </form>
      </div>

      <div className="m-2 p-5 border-solid border-2 border-gray-200 rounded-md mt-4">
        <div className="font-bold text-lg text-center">
          <h2 className="font-bold text-lg text-center">Preview</h2>
        </div>

        <div className="columns-1 lg:gap-8 sm:columns-2 lg:columns-3 xl:columns-4 space-y-8 mt-5">
          {images.length > 0 &&
            images.map((singleImage, index) => (
              <div
                key={index}
                className="max-w-sm bg-white shadow-lg duration-500 hover:scale-105 hover:shadow-xl relative"
              >
                <div
                  className="absolute text-xl font-bold text-red-500 bg-green-500 px-2 right-0 hover:bg-red-500 hover:text-green-500 cursor-pointer"
                  onClick={() => handleDelete(index)}
                >
                  <i className="fa fa-times" />
                </div>
                <img src={URL.createObjectURL(singleImage)} alt="" />
              </div>
            ))}
        </div>

  
      </div>
    </>
  );
}

export default AddImageForm;