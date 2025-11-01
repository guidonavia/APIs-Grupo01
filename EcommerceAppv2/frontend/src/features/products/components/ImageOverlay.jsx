import { useState } from "react"
import styled from "styled-components"
import { Close } from "../../../shared/components/ui"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import { useCart } from "../../../features/cart/context/CartContext"

const ImageOverlay = ({
  images,
  overlayRef,
  carouselRef,
  imageIndex,
  setImageIndex,
}) => {
  const { hideImageOverlay } = useCart()
  const [imageErrors, setImageErrors] = useState({})

  if (!images || !Array.isArray(images) || images.length === 0) {
    return null
  }

  const handleImageError = (imageId, imageUrl) => {
    if (imageUrl?.startsWith('blob:')) {
      setImageErrors(prev => ({ ...prev, [imageId]: true }))
    }
  }

  const productImages = images.map((img, idx) => ({ 
    id: img.id || idx,
    url: img.url, 
    alt: img.alt || "Product image" 
  }))
  const productThumbnails = images.map((img, idx) => ({ 
    id: img.id || idx,
    url: img.thumbnail || img.url, 
    alt: img.alt || "Product thumbnail" 
  }))

  return (
    <OverlayWrapper>
      <div className="inner-overlay">
        <button className="close-btn" onClick={hideImageOverlay}>
          <Close />
        </button>
        {productImages.length > 0 && (
          <Splide
            options={{ autoWidth: false, pagination: false, type: "loop" }}
            ref={overlayRef}
            onMove={() => {
              if (overlayRef.current && carouselRef.current) {
                setImageIndex(overlayRef.current.splide.index)
                carouselRef.current.go(overlayRef.current.splide.index)
              }
            }}
          >
            {productImages.map((image, idx) => (
              <SplideSlide key={image.id || idx}>
                <button>
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    onError={() => handleImageError(image.id || idx, image.url)}
                    style={{ display: imageErrors[image.id || idx] ? 'none' : 'block' }}
                  />
                  {imageErrors[image.id || idx] && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '100%',
                      color: '#fff',
                      fontSize: '1.6rem'
                    }}>
                      Imagen no disponible
                    </div>
                  )}
                </button>
              </SplideSlide>
            ))}
          </Splide>
        )}
        <div className="thumbnails">
          {productThumbnails.length > 0 ? (
            productThumbnails.map((thumbnail, idx) => (
              <button
                className={`thumb-btn ${imageIndex === idx ? "active" : ""}`}
                onClick={() => {
                  if (overlayRef.current && carouselRef.current) {
                    overlayRef.current.go(idx)
                    carouselRef.current.go(idx)
                  }
                }}
                key={thumbnail.id || idx}
              >
                <img 
                  src={thumbnail.url} 
                  alt={thumbnail.alt}
                  onError={() => handleImageError(thumbnail.id || idx, thumbnail.url)}
                  style={{ display: imageErrors[thumbnail.id || idx] ? 'none' : 'block' }}
                />
              </button>
            ))
          ) : (
            <p>No hay miniaturas.</p>
          )}
        </div>
      </div>
    </OverlayWrapper>
  )
}

const OverlayWrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: hsl(var(--black) / 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  .inner-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;

    .close-btn {
      margin-bottom: 2.4rem;
      align-self: flex-end;

      svg path {
        transition: 0.2s ease fill;
      }

      &:hover svg path {
        fill: hsl(var(--orange));
      }
    }

    .splide {
      cursor: pointer;
      width: 55rem;
      height: 55rem;
      margin-bottom: 4rem;
    }

    .splide__slide {
      overflow: hidden;
      border-radius: 1.5rem;
      width: 55rem;
      height: 55rem;
    }

    .splide__arrow,
    .splide__arrow:disabled {
      opacity: 1;
    }

    .splide__arrow {
      background-color: hsl(var(--white));
      height: 5.6rem;
      width: 5.6rem;
    }

    .splide__arrow--prev {
      left: -2.8rem;
    }

    .splide__arrow--next {
      right: -2.8rem;
    }

    img {
      display: block;
      width: 100%;
    }

    .thumbnails {
      display: flex;
      justify-content: space-around;
      gap: 3.1rem;

      .thumb-btn {
        border-radius: 1rem;
        overflow: hidden;
        transition: 0.3s ease opacity;
        height: 8.8rem;
        width: 8.8rem;

        &.active {
          img {
            opacity: 0.5;
          }
          outline: 0.2rem solid hsl(var(--orange));
        }

        &:hover {
          opacity: 0.8;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`

export default ImageOverlay

