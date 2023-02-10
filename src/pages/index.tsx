import HeroComponent from "@/components/HeroComponent/HeroComponent";
import NewsTicker from "@/components/NewsTicker/NewsTicker";
import { Card, Col, Container, Row } from "react-bootstrap";

const Index = () => {
  return (
    <>
      {/* <NavbarComponent /> */}
      <HeroComponent />
      <Container className="my-5">
        <Row>
            <Col sm={12} md={6} lg={6}>
                <NewsTicker />
            </Col>
            <Col sm={12} md={6} lg={6}>
                <NewsTicker />
            </Col>

        </Row>
      </Container>
    </>
  );
}

export default Index;