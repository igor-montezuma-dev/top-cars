import { Container } from "../../components/container";
import VehicleForm from "../../components/register-car-form";

export function Register() {
  const onAddVehicle = () => {};

  const someNextVehicleId = 1;

  return (
    <Container>
      <VehicleForm
        onAddVehicle={onAddVehicle}
        nextVehicleId={someNextVehicleId}
      />
    </Container>
  );
}
