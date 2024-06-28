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

  const sortedBrands = Object.keys(groupedVehicles).sort();

  if (isLoading) {
    return (
      <div className="text-center text-xl font-semibold">Carregando...</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {sortedBrands.map((brand) => (
        <div key={brand} className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Marca: {brand}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {groupedVehicles[brand].map((vehicle) => (
              <div
                key={vehicle.id}
                className="p-4 border bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <h3 className="text-lg font-semibold">{vehicle.nome_modelo}</h3>
                <p className="text-sm text-gray-600">Ano: {vehicle.ano}</p>
                <p className="text-sm text-gray-600">
                  Número de portas: {vehicle.num_portas}
                </p>
                <p className="text-sm text-gray-600">
                  Combustível: {vehicle.combustivel}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
