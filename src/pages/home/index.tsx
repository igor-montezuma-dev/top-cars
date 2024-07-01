import VehicleList from "../../components/car-list";
import { Container } from "../../components/container";

export function Home() {
  return (
    <Container>
      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Veículos disponíveis
      </h1>

      <VehicleList />
    </Container>
  );
}
