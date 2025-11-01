import { useRef, useState } from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import { useCart } from "../../../features/cart/context/CartContext"
import ImageOverlay from "./ImageOverlay"
import styled from "styled-components"

const ImageCarousel = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState({})
  const {
    state: { screenWidth, showingOverlay },
    showImageOverlay,
  } = useCart()

  const carouselRef = useRef(null)
  const overlayRef = useRef(null)

  const handleImageError = (imageId, imageUrl) => {
    // Check if it's a blob URL that failed
    if (imageUrl?.startsWith('blob:')) {
      setImageErrors(prev => ({ ...prev, [imageId]: true }))
    }
  }

  // Filter out images with blob URLs that we know are invalid
  const validImages = images?.filter((img, idx) => {
    const imageId = img.id || idx
    if (imageErrors[imageId]) return false
    // Check if it's a blob URL - these are often invalid after page reload
    if (typeof img.url === 'string' && img.url.startsWith('blob:')) {
      // We'll still try to render it, but handle errors
      return true
    }
    return true
  }) || []

  if (!images || images.length === 0 || validImages.length === 0) {
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
          {validImages.map((image, idx) => (
            <SplideSlide key={image.id || idx}>
              <img 
                src={image.url} 
                alt={`Product image ${idx + 1}`}
                onError={() => handleImageError(image.id || idx, image.url)}
                style={{ display: imageErrors[image.id || idx] ? 'none' : 'block' }}
              />
              {imageErrors[image.id || idx] && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '100%',
                  color: '#999',
                  fontSize: '1.4rem'
                }}>
                  Imagen no disponible
                </div>
              )}
            </SplideSlide>
          ))}
        </Splide>
        
        <div className="thumbnails">
          {validImages.length > 1 && validImages.map((image, idx) => (
            <button
              className={`thumb-btn ${imageIndex === idx ? "active" : ""}`}
              key={image.id || idx}
              onClick={() => {
                setImageIndex(idx)
                carouselRef.current.go(idx)
              }}
            >
              <img 
                src={image.thumbnail || image.url} 
                alt={`Product thumbnail ${idx + 1}`}
                onError={() => handleImageError(image.id || idx, image.thumbnail || image.url)}
                style={{ display: imageErrors[image.id || idx] ? 'none' : 'block' }}
              />
            </button>
          ))}
        </div>
      </CarouselWrapper>
      {showingOverlay && (
        <ImageOverlay
          carouselRef={carouselRef}
          overlayRef={overlayRef}
          images={validImages}
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

