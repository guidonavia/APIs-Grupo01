import styled from "styled-components"
import PropTypes from "prop-types"

/**
 * Button - Reusable button component with accessibility and disabled states
 * @param {Function} func - onClick handler
 * @param {React.ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Disabled state
 * @param {string} color - Text color (defaults to white)
 * @param {string} ariaLabel - ARIA label for accessibility
 */
const Button = ({ func, children, className, disabled = false, color = "#FFFFFF", ariaLabel }) => {
  const handleClick = (e) => {
    if (!disabled && func) {
      func(e)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (!disabled && func) {
        func(e)
      }
    }
  }

  return (
    <StyledButton
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      $color={color}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  width: 100%;
  background-color: hsl(var(--orange));
  padding: 1.9rem;
  border-radius: 1rem;
  color: ${(props) => props.$color || "hsl(var(--white))"};
  font-size: 1.6rem;
  font-weight: 700;
  transition: opacity 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid hsl(var(--orange));
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.cart {
    box-shadow: 0px 2rem 5rem -2rem hsl(var(--orange));
  }

  @media screen and (min-width: 768px) {
    &.cart {
      box-shadow: none;
    }
  }
`

Button.propTypes = {
  func: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  ariaLabel: PropTypes.string,
}

export default Button

