import { useRef, useState } from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import { useGlobalContext } from "../context/context"
import ImageOverlay from "./ImageOverlay"
import styled from "styled-components"

const ImageCarousel = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const {
    state: { screenWidth, showingOverlay },
    showImageOverlay,
  } = useGlobalContext()

  const carouselRef = useRef(null)
  const overlayRef = useRef(null)

  // 1. Comprobación de seguridad: Si no hay imágenes, no renderizar nada.
  // Esto evita el error "Cannot read properties of undefined".
  if (!images || images.length === 0) {
    return <div className="placeholder">Cargando imagen...</div>
  }

  const splideOptions = {
    pagination: false,
    arrows: screenWidth < 768, // Solo mostrar flechas en móvil
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
        
        {/* 2. Las miniaturas solo se muestran en pantallas grandes */}
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

// --- ESTILOS CORREGIDOS ---
const CarouselWrapper = styled.section`
  .splide__slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1 / 1; /* Asegura que la imagen sea cuadrada */
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

  /* 3. Ocultamos las miniaturas por defecto */
  .thumbnails {
    display: none;
  }

  /* 4. Mostramos y estilizamos las miniaturas solo en pantallas grandes */
  @media only screen and (min-width: 768px) {
    .thumbnails {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      padding: 0 1rem; /* Añadimos padding para que no se peguen a los bordes */

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