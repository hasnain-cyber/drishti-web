import HeroComponent from "@/frontend/components/HeroComponent/HeroComponent";
import NewsTicker from "@/frontend/components/NewsTicker/NewsTicker";
import { Col, Container, Row } from "react-bootstrap";

const Index = () => {
  return (
    <>
      {/* <NavbarComponent /> */}
      <HeroComponent />
      <Container className="my-5">
        <Row className="px-3">
          <Col sm={12} md={6} lg={6} className="my-3">
            <NewsTicker title={'New learning modules'} />
          </Col>
          <Col sm={12} md={6} lg={6} className="my-3">
            <NewsTicker title={'Popular learning modules'} />
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default Index;