import { useRef, useState, useEffect } from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import { useGlobalContext } from "../context/context"
import ImageOverlay from "./ImageOverlay"
import styled from "styled-components"

// 1. Cambiamos las props que recibe el componente. Ahora solo es 'images'.
const ImageCarousel = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const {
    state: { screenWidth, showingOverlay },
    showImageOverlay,
  } = useGlobalContext()

  // Carousel and Overlay refs
  const carouselRef = useRef(null)
  const overlayRef = useRef(null)

  const splideOptions = {
    pagination: false,
    height: `${
      screenWidth < 601 ? "30rem" : screenWidth < 768 ? "40rem" : "44.5rem"
    }`,
    type: "loop",
    autoWidth: false,
    perPage: 1,
    drag: false,
  }

  // 2. Agregamos una comprobación para evitar errores si 'images' aún no ha llegado.
  if (!images || images.length === 0) {
    return <div>Cargando imágenes...</div>
  }

  return (
    <>
      <CarouselWrapper>
        <Splide
          onClick={() => {
            if (screenWidth >= 768) {
              // Solo mostrar overlay en pantallas más grandes
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
          {/* 3. Usamos el array 'images' para las imágenes principales */}
          {images.map((image, idx) => {
            const { url, id } = image
            return (
              <SplideSlide key={id || idx}>
                <img src={url} alt={`Product image ${id}`} />
              </SplideSlide>
            )
          })}
        </Splide>
        <div className="thumbnails">
          {/* 4. Usamos el mismo array 'images' para los thumbnails */}
          {images.map((image, idx) => {
            const { thumbnail, id } = image
            return (
              <button
                className={`thumb-btn ${imageIndex === idx ? "active" : ""}`}
                key={id || idx}
                onClick={() => {
                  setImageIndex(idx)
                  carouselRef.current.go(idx)
                }}
              >
                <img src={thumbnail} alt={`Product thumbnail ${id}`} />
              </button>
            )
          })}
        </div>
      </CarouselWrapper>
      {showingOverlay && (
        <ImageOverlay
          carouselRef={carouselRef}
          overlayRef={overlayRef}
          // 5. Pasamos el array 'images' al overlay también
          images={images}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
        />
      )}
    </>
  )
}

const CarouselWrapper = styled.section`
  .splide {
    cursor: pointer;
    width: 100%;
  }

  .splide__track {
    /* margin: 0 auto; */
  }

  .splide__arrow {
    background-color: hsl(var(--white));
    opacity: 1;
    height: 4rem;
    width: 4rem;
  }

  img {
    display: block;
    width: 100%;
    object-fit: cover;
  }

  .thumbnails {
    display: none;
  }

  @media only screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    max-width: 80%;
    margin: 0 auto;

    .splide__arrow {
      display: none;
    }

    .thumbnails {
      display: flex;
      gap: 3rem;

      .thumb-btn {
        border-radius: 1rem;
        overflow: hidden;
        transition: 0.3s ease opacity;

        &.active {
          img {
            opacity: 0.5;
          }
          outline: 0.2rem solid hsl(var(--orange));
        }

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  @media only screen and (min-width: 1000px) {
    max-width: 100%;

    .splide__slide img {
      border-radius: 1.5rem;
    }

    .splide__arrow--next,
    .splide__arrow--prev {
      display: none;
    }
  }
`

export default ImageCarousel