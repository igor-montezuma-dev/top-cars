import React, { useState } from "react";

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
  brand: string;
}

interface VehicleFormProps {
  onAddVehicle: (vehicle: Vehicle) => void;
  nextVehicleId: number;
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  onAddVehicle,
  nextVehicleId,
}) => {
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    modelo_id: 0,
    ano: new Date().getFullYear(),
    combustivel: "",
    num_portas: 4,
    cor: "",
    nome_modelo: "",
    valor: 0,
    brand: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewVehicle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const vehicleToAdd = {
      ...newVehicle,
      id: nextVehicleId,
      timestamp_cadastro: Date.now(),
    } as Vehicle;
    onAddVehicle(vehicleToAdd);
    setNewVehicle({
      modelo_id: 0,
      ano: new Date().getFullYear(),
      combustivel: "",
      num_portas: 4,
      cor: "",
      nome_modelo: "",
      valor: 0,
      brand: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 border rounded-lg shadow-lg bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Modelo:
          </label>
          <input
            type="text"
            name="nome_modelo"
            value={newVehicle.nome_modelo || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Ano:</label>
          <input
            type="number"
            name="ano"
            value={newVehicle.ano || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Número de Portas:
          </label>
          <input
            type="number"
            name="num_portas"
            value={newVehicle.num_portas || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Combustível:
          </label>
          <select
            name="combustivel"
            value={newVehicle.combustivel || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione...</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Álcool">Álcool</option>
            <option value="Diesel">Diesel</option>
            <option value="Flex">Flex</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Cor:</label>
          <input
            type="text"
            name="cor"
            value={newVehicle.cor || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Marca:
          </label>
          <input
            type="text"
            name="brand"
            value={newVehicle.brand || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Valor:
          </label>
          <input
            type="number"
            name="valor"
            value={newVehicle.valor || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Registrar Veículo
      </button>
    </form>
  );
};

export default VehicleForm;
