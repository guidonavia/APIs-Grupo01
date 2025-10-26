import styled from "styled-components";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <FooterWrapper>
      <Inner>
        <Brand>
          <h3>SportSneaks</h3>
          <p>Calzado deportivo premium. Envíos a todo el país.</p>
        </Brand>

        <Links>
          <Column>
            <h4>Compra</h4>
            <a href="#">Cómo comprar</a>
            <a href="#">Formas de pago</a>
            <a href="#">Envíos y devoluciones</a>
          </Column>

          <Column>
            <h4>Soporte</h4>
            <a href="#">Contacto</a>
            <a href="#">Preguntas frecuentes</a>
            <a href="#">Garantía</a>
          </Column>

          <Column>
            <h4>Legal</h4>
            <a href="#">Términos y condiciones</a>
            <a href="#">Política de privacidad</a>
            <a href="#">Cookies</a>
          </Column>
        </Links>

        <Newsletter>
          <h4>Newsletter</h4>
          <p>Recibí novedades y descuentos exclusivos.</p>
          <Form onSubmit={(e) => e.preventDefault()}>
            <input aria-label="email" type="email" placeholder="Tu email" />
            <button type="submit">Suscribirme</button>
          </Form>
        </Newsletter>
      </Inner>

      <Bottom>
        <div>© {year} SportSneaks. Todos los derechos reservados.</div>
        <div className="small-links">
          <a href="#">Contacto</a>
          <a href="#">Trabajá con nosotros</a>
        </div>
      </Bottom>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background: linear-gradient(180deg, #0f1724 0%, #071029 100%);
  color: #e6eef8;
  padding: 3rem 1.5rem;
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 320px;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 1.5rem auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Brand = styled.div`
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.6rem;
    color: #fff;
    letter-spacing: 0.6px;
  }
  p {
    margin: 0;
    color: #c9d8ea;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 900px) {
    justify-content: center;
    margin-top: 1rem;
  }
`;

const Column = styled.div`
  h4 {
    margin: 0 0 0.6rem 0;
    color: #fff;
  }
  display: flex;
  flex-direction: column;
  a {
    color: #bcd3ef;
    text-decoration: none;
    margin: 0.28rem 0;
    transition: color 160ms, transform 160ms;
  }
  a:hover {
    color: #fff;
    transform: translateX(4px);
  }
`;

const Newsletter = styled.div`
  h4 {
    margin: 0 0 0.4rem 0;
    color: #fff;
  }
  p {
    margin: 0 0 0.8rem 0;
    color: #b6cde7;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 0.6rem;

  input {
    padding: 0.6rem 0.8rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    color: #fff;
    min-width: 0;
    flex: 1;
  }
  button {
    background: linear-gradient(90deg, #ff7a18, #ff3d00);
    border: none;
    color: white;
    padding: 0.6rem 0.9rem;
    border-radius: 999px;
    font-weight: 700;
    cursor: pointer;
  }
  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const Bottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  color: #9fb6d6;

  .small-links a {
    margin-left: 1rem;
    color: #9fb6d6;
    text-decoration: none;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0.6rem;
    align-items: center;
  }
`;

export default Footer;
