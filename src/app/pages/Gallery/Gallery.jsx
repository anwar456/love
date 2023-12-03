import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

const Gallery = () => {
  const imagesPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const images = [
    "image/1.jpeg",
    "image/2.jpeg",
    "image/3.jpeg",
    "image/4.jpeg",
    "image/5.jpeg",
    "image/6.jpeg",
    "image/7.jpeg",
    "image/8.jpeg",
    "image/9.jpeg",
    "image/10.jpeg",
    "image/11.jpeg",
    "image/12.jpeg",
    "image/13.jpeg",
    "image/14.jpeg",
    "image/15.jpeg",
    "image/16.jpeg",
    "image/17.jpeg",
    "image/18.jpeg",
    "image/19.jpeg",
    "image/20.jpeg",
    "image/21.jpeg",
    "image/22.jpeg",
    "image/23.jpeg",
    "image/24.jpeg",
    "image/25.jpeg",
    "image/26.jpeg",
    "image/27.jpeg",
    "image/28.jpeg",
    "image/29.jpeg",
    "image/30.jpeg",
    "image/31.jpeg",
    "image/32.jpeg",
  ];

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h3 className="heading">Our Gallery</h3>

      <div className="image-grid mt-5">
        {currentImages.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <Pagination className="mt-4">
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />

          {[...Array(Math.ceil(images.length / imagesPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}

          <Pagination.Next
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(images.length / imagesPerPage))
              )
            }
          />
        </Pagination>
      </div>
    </div>
  );
};

export default Gallery;
