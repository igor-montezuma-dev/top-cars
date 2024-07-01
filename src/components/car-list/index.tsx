import axios from "axios";
import { useEffect, useState } from "react";

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
  model: Model;
}

interface Model {
  id: number;
  nome: string;
  valor_fipe: number;
  brand: Brand;
}

interface Brand {
  marca_id: number;
  nome_marca: string;
}

const VehicleList = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://top-cars-api.onrender.com/cars"
        );
        setVehicles(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao processar veículos:", error);
      }
    }
    fetchData();
  }, []);

  type GroupedVehicles = {
    [key: string]: Vehicle[];
  };

  const groupedVehicles: GroupedVehicles = vehicles.reduce(
    (acc: GroupedVehicles, vehicle: Vehicle) => {
      const brandName = vehicle.model.brand.nome_marca;
      if (!acc[brandName]) {
        acc[brandName] = [];
      }
      acc[brandName].push(vehicle);
      return acc;
    },
    {}
  );

  const sortedBrands = Object.keys(groupedVehicles).sort();

  if (isLoading) {
    return (
      <div className="text-center text-xl font-semibold">Carregando...</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {sortedBrands.map((brandName) => (
        <div key={brandName} className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Marca: {brandName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {groupedVehicles[brandName].map((vehicle) => (
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
