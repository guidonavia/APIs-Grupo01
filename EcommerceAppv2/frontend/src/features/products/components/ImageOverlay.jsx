import { useState } from "react"
import styled from "styled-components"
import { Close } from "../../../shared/components/ui"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import { useCart } from "../../../features/cart/context/CartContext"

const ImageOverlay = ({
  fotos,
  overlayRef,
  carouselRef,
  imageIndex,
  setImageIndex,
}) => {
  const { hideImageOverlay } = useCart()
  const [imageErrors, setImageErrors] = useState({})

  if (!fotos || !Array.isArray(fotos) || fotos.length === 0) {
    return null
  }

  const handleImageError = (imageId, imageUrl) => {
    if (imageUrl?.startsWith('blob:')) {
      setImageErrors(prev => ({ ...prev, [imageId]: true }))
    }
  }

  const productfotos = fotos.map((img, idx) => ({ 
    id: img.id || idx,
    url: img.url, 
    alt: img.alt || "Product image" 
  }))
  const productThumbnails = fotos.map((img, idx) => ({ 
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
        {productfotos.length > 0 && (
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
            {productfotos.map((image, idx) => (
              <SplideSlide key={image.id || idx}>
                {imageErrors[image.id || idx] ? (
                  <ErrorContainer>
                    <ErrorMessage>Imagen no disponible</ErrorMessage>
                  </ErrorContainer>
                ) : (
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    onError={() => handleImageError(image.id || idx, image.url)}
                  />
                )}
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
                {imageErrors[thumbnail.id || idx] ? (
                  <ThumbnailPlaceholder>N/A</ThumbnailPlaceholder>
                ) : (
                  <img 
                    src={thumbnail.url} 
                    alt={thumbnail.alt}
                    onError={() => handleImageError(thumbnail.id || idx, thumbnail.url)}
                  />
                )}
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
      height: 100%;
      object-fit: cover;
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

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`

const ErrorMessage = styled.div`
  color: #fff;
  font-size: 1.6rem;
  text-align: center;
  padding: 2rem;
`

const ThumbnailPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #999;
  font-size: 1rem;
`

export default ImageOverlay

