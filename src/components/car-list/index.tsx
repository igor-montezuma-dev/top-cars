import { useEffect, useState } from "react";
import data from "../../data/cars.json";

interface Vehicle {
  id: number;
  timestamp_cadastro: number;
  modelo_id: number;
  ano: number;
  combustivel: string;
  num_portas: number;
  cor: string;
  nome_modelo: string;
  valor: number;
  brand: number;
}

const VehicleList = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      
      setVehicles(data.cars);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao processar veículos:", error);
    }
  }, []);

  type GroupedVehicles = {
    [key: string]: Vehicle[];
  };

  const groupedVehicles: GroupedVehicles = Array.isArray(vehicles)
    ? vehicles.reduce((acc: GroupedVehicles, vehicle: Vehicle) => {
        const { brand } = vehicle;
        if (!acc[brand]) {
          acc[brand] = [];
        }
        acc[brand].push(vehicle);
        return acc;
      }, {})
    : {};

  if (isLoading) {
    return (
      <div className="text-center text-xl font-semibold">Carregando...</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {Object.keys(groupedVehicles).map((brand) => (
        <div key={brand} className="mb-6">
          <h2 className="text-2xl font-bold mb-4">{brand}</h2>
          <ul className="space-y-2">
            {groupedVehicles[brand].map((vehicle) => (
              <li
                key={vehicle.id}
                className="p-4 border rounded-lg shadow hover:bg-gray-100 transition duration-200"
              >
                {vehicle.nome_modelo} - {vehicle.ano}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
