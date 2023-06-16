import Container from "@/components/common/Container";
import Home from "./Home";
import Values from "./Values";
import Team from "./Team";

const Landing = () => {
  return (
    <Container className="!overflow-x-hidden !mt-0 !py-0 !px-0">
      <Home />
      <Values />
      <Team />
    </Container>
  );
};

export default Landing;
