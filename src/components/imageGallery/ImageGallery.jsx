/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../../features/imageGallery/imageGallerySlice';
import ImageCard from './ImageCard';

function ImageGallery() {
  const images = useSelector((state) => state.ImageGallery.images);
  const { searchText } = useSelector((state) => state.operations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImages())
  }, []);

  return images?.length ? (
    <div className="m-2 p-5 border-solid border-2 border-gray-200 rounded-md mt-4">
        <div className="font-bold text-lg text-center">
          <h2 className="font-bold text-lg text-center">Images</h2>
        </div>

        <div className="columns-1 lg:gap-8 sm:columns-2 lg:columns-3 xl:columns-4 space-y-8 mt-5">
      
        {
          images.map((image) => <ImageCard image={image} key={image._id} />)
        }
      </div>
    </div>
  ) : <></>;
}

export default ImageGallery;
