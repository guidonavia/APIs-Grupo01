import { useRef, useState } from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import { useCart } from "../../../features/cart/context/CartContext"
import ImageOverlay from "./ImageOverlay"
import styled from "styled-components"

const ImageCarousel = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const {
    state: { screenWidth, showingOverlay },
    showImageOverlay,
  } = useCart()

  const carouselRef = useRef(null)
  const overlayRef = useRef(null)

  if (!images || images.length === 0) {
    return <div className="placeholder">Cargando imagen...</div>
  }

  const splideOptions = {
    pagination: false,
    arrows: screenWidth < 768,
    height: "auto",
    type: "loop",
    perPage: 1,
    drag: true,
  }

  return (
    <>
      <CarouselWrapper>
        <Splide
          onClick={() => {
            if (screenWidth >= 768) {
              showImageOverlay()
              if (carouselRef.current && overlayRef.current) {
                overlayRef.current.sync(carouselRef.current.splide)
                setImageIndex(carouselRef.current.splide.index)
              }
            }
          }}
          options={splideOptions}
          ref={carouselRef}
          onMove={() => setImageIndex(carouselRef.current.splide.index)}
        >
          {images.map((image, idx) => (
            <SplideSlide key={image.id || idx}>
              <img src={image.url} alt={`Product image ${idx + 1}`} />
            </SplideSlide>
          ))}
        </Splide>
        
        <div className="thumbnails">
          {images.length > 1 && images.map((image, idx) => (
            <button
              className={`thumb-btn ${imageIndex === idx ? "active" : ""}`}
              key={image.id || idx}
              onClick={() => {
                setImageIndex(idx)
                carouselRef.current.go(idx)
              }}
            >
              <img src={image.thumbnail} alt={`Product thumbnail ${idx + 1}`} />
            </button>
          ))}
        </div>
      </CarouselWrapper>
      {showingOverlay && (
        <ImageOverlay
          carouselRef={carouselRef}
          overlayRef={overlayRef}
          images={images}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
        />
      )}
    </>
  )
}

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
`

export default ImageCarousel

