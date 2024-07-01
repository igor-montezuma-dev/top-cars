import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Car, Model } from "../../types/Car.type";
import InputField from "../input-field";

interface VehicleFormProps {
  onAddVehicle: (car: Car) => void;
  nextVehicleId: number;
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  onAddVehicle,
  nextVehicleId,
}) => {
  const [newVehicle, setNewVehicle] = useState<Partial<Car>>({
    modelo_id: 0,
    ano: new Date().getFullYear(),
    combustivel: "",
    num_portas: 0,
    cor: "",
    valor: 0,
    nome_modelo: "", // Incluir nome_modelo no estado
  });
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get<Model[]>(
        "https://top-cars-api.onrender.com/models"
      );
      setModels(response.data);
    } catch (error) {
      console.error("Erro ao carregar modelos:", error);
      toast.error("Erro ao carregar os modelos.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "modelo_id") {
      const selectedModel = models.find(
        (model) => model.id === parseInt(value, 10)
      );
      if (selectedModel) {
        setNewVehicle((prevState) => ({
          ...prevState,
          modelo_id: selectedModel.id,
          nome_modelo: selectedModel.nome,
        }));
      }
    } else {
      setNewVehicle((prevState) => ({
        ...prevState,
        [name]:
          name === "valor" || name === "num_portas" || name === "ano"
            ? parseInt(value, 10)
            : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const vehicleToAdd: Car = {
        modelo_id: newVehicle.modelo_id || 0,
        nome_modelo: newVehicle.nome_modelo || "",
        cor: newVehicle.cor || "",
        ano: newVehicle.ano || new Date().getFullYear(),
        valor: newVehicle.valor || 0,
        combustivel: newVehicle.combustivel || "",
        num_portas: newVehicle.num_portas || 0,
        id: nextVehicleId,
        timestamp_cadastro: Date.now(),
      };

      await sendToApi(vehicleToAdd);
      onAddVehicle(vehicleToAdd);
      resetForm();
      toast.success("Veículo cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao processar formulário:", error);
      toast.error("Erro ao processar formulário");
    }
  };

  const sendToApi = async (car: Car) => {
    try {
      const formattedCar = {
        modeloId: car.modelo_id,
        nomeModelo: car.nome_modelo,
        cor: car.cor,
        ano: car.ano,
        valor: car.valor,
        combustivel: car.combustivel,
        numPortas: car.num_portas,
      };

      const response = await axios.post(
        "https://top-cars-api.onrender.com/cars",
        formattedCar
      );
      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error("Erro ao enviar para a API:", error);
      throw new Error("Erro ao enviar para a API.");
    }
  };

  const resetForm = () => {
    setNewVehicle({
      modelo_id: 0,
      ano: new Date().getFullYear(),
      combustivel: "",
      num_portas: 0,
      cor: "",
      valor: 0,
      nome_modelo: "",
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-6 border rounded-lg shadow-lg bg-white"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Modelo
          </label>
          <select
            name="modelo_id"
            value={newVehicle.modelo_id || ""}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Selecione um modelo</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.nome}
              </option>
            ))}
          </select>
        </div>

        <InputField
          label="Valor"
          name="valor"
          type="number"
          value={newVehicle.valor || ""}
          onChange={handleChange}
          required
        />
        <InputField
          label="Combustível"
          name="combustivel"
          type="text"
          value={newVehicle.combustivel || ""}
          onChange={handleChange}
          required
        />
        <InputField
          label="Cor"
          name="cor"
          type="text"
          value={newVehicle.cor || ""}
          onChange={handleChange}
          required
        />
        <InputField
          label="Número de portas"
          name="num_portas"
          type="number"
          value={newVehicle.num_portas || ""}
          onChange={handleChange}
          required
        />
        <InputField
          label="Ano"
          name="ano"
          type="number"
          value={newVehicle.ano || ""}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Registrar Veículo
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default VehicleForm;
