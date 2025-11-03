import { useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useCart } from "../../../features/cart/context/CartContext";
import ImageOverlay from "./ImageOverlay";
import styled from "styled-components";

const ImageCarousel = ({ fotos }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const {
    state: { screenWidth, showingOverlay },
    showImageOverlay,
  } = useCart();

  const carouselRef = useRef(null);
  const overlayRef = useRef(null);

  const handleImageError = (imageId, imageUrl) => {
    if (imageUrl?.startsWith("blob:")) {
      setImageErrors((prev) => ({ ...prev, [imageId]: true }));
    }
  };

  // Filter out fotos with blob URLs that we know are invalid
  const validfotos =
    fotos?.filter((img, idx) => {
      const imageId = img.id || idx;
      if (imageErrors[imageId]) return false;
      // Check if it's a blob URL - these are often invalid after page reload
      if (typeof img.url === "string" && img.url.startsWith("blob:")) {
        // We'll still try to render it, but handle errors
        return true;
      }
      return true;
    }) || [];

  if (!fotos || fotos.length === 0 || validfotos.length === 0) {
    return <PlaceholderSkeleton> Cargando imagen... </PlaceholderSkeleton>;
  }

  const splideOptions = {
    pagination: false,
    arrows: screenWidth < 768,
    height: "auto",
    type: "loop",
    perPage: 1,
    drag: true,
  };

  return (
    <>
      <CarouselWrapper>
        <Splide
          onClick={() => {
            if (screenWidth >= 768) {
              showImageOverlay();
              if (carouselRef.current && overlayRef.current) {
                overlayRef.current.sync(carouselRef.current.splide);
                setImageIndex(carouselRef.current.splide.index);
              }
            }
          }}
          options={splideOptions}
          ref={carouselRef}
          onMove={() => setImageIndex(carouselRef.current.splide.index)}
        >
          {validfotos.map((image, idx) => (
            <SplideSlide key={image.id || idx}>
              {imageErrors[image.id || idx] ? (
                <ErrorContainer>
                  <ErrorMessage>Imagen no disponible</ErrorMessage>
                </ErrorContainer>
              ) : (
                <img
                  src={image.url}
                  alt={`Product image ${idx + 1}`}
                  onError={() => handleImageError(image.id || idx, image.url)}
                />
              )}
            </SplideSlide>
          ))}
        </Splide>

        <div className="thumbnails">
          {validfotos.length > 1 &&
            validfotos.map((image, idx) => (
              <button
                className={`thumb-btn ${imageIndex === idx ? "active" : ""}`}
                key={image.id || idx}
                onClick={() => {
                  setImageIndex(idx);
                  carouselRef.current.go(idx);
                }}
              >
                {imageErrors[image.id || idx] ? (
                  <ThumbnailPlaceholder>N/A</ThumbnailPlaceholder>
                ) : (
                  <img
                    src={image.thumbnail || image.url}
                    alt={`Product thumbnail ${idx + 1}`}
                    onError={() =>
                      handleImageError(
                        image.id || idx,
                        image.thumbnail || image.url
                      )
                    }
                  />
                )}
              </button>
            ))}
        </div>
      </CarouselWrapper>
      {showingOverlay && (
        <ImageOverlay
          carouselRef={carouselRef}
          overlayRef={overlayRef}
          fotos={validfotos}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
        />
      )}
    </>
  );
};

const CarouselWrapper = styled.section`
  .splide__slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1 / 1;
  }

  .splide__arrow {
    background-color: hsl(var(--white));
    opacity: 1;
    height: 4rem;
    width: 4rem;
  }

  .splide {
    cursor: pointer;
  }

  .thumbnails {
    display: none;
  }

  @media only screen and (min-width: 768px) {
    .thumbnails {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      padding: 0 1rem;

      .thumb-btn {
        border-radius: 0.8rem;
        overflow: hidden;
        border: 2px solid transparent;
        transition: border-color 0.3s ease;

        &.active {
          border-color: hsl(var(--orange));
          img {
            opacity: 0.5;
          }
        }

        img {
          width: 100%;
          display: block;
        }
      }
    }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  min-height: 300px;
  border-radius: 0.6rem;
  overflow: hidden;
  background: linear-gradient(90deg, #f0f0f0 25%, #e6e6e6 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s linear infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #999;
  font-size: 1.2rem;
  text-align: center;
  padding: 1.2rem 1rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0.4rem;
`;

const ThumbnailPlaceholder = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #f0f0f0 25%, #e6e6e6 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s linear infinite;
  color: #999;
  font-size: 0.9rem;
  border-radius: 0.6rem;
  overflow: hidden;
`;

const PlaceholderSkeleton = styled.div`
  width: 100%;
  max-width: 900px;
  aspect-ratio: 1 / 1;
  min-height: 320px;
  border-radius: 0.6rem;
  margin: 0 auto;
  background: linear-gradient(90deg, #f0f0f0 25%, #e6e6e6 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-weight: 700;
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export default ImageCarousel;
