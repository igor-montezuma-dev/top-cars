import { Container } from "../../components/container";
import VehicleForm from "../../components/register-car-form";

export function Register() {
  return (
    <Container>
      <VehicleForm onAddVehicle={function (vehicle: Vehicle): void {
              throw new Error("Function not implemented.");
          } } nextVehicleId={0} />
    </Container>
  );
}
