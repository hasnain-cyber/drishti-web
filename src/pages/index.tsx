import HeroComponent from "@/frontend/components/HeroComponent/HeroComponent";
import NewTicker from "@/frontend/components/NewTicker/NewTicker";
import PopularTicker from "@/frontend/components/PopularTicker/PopularTicker";

import { Col, Container, Row } from "react-bootstrap";

const Index = () => {
  return (
    <>
      {/* <NavbarComponent /> */}
      <HeroComponent />
      <Container className="my-5">
        <Row className="px-3">
          <Col sm={12} md={6} lg={6} className="my-3">
            <NewTicker />
          </Col>
          <Col sm={12} md={6} lg={6} className="my-3">
            <PopularTicker />
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default Index;