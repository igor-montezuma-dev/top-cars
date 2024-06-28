import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import vehicleSchema from "../../schemas/vehicle-schema";
import InputField from "../input-field";

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
  const [validationErrors, setValidationErrors] = useState<z.ZodIssue[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVehicle((prevState) => ({
      ...prevState,
      [name]:
        name === "valor" || name === "num_portas" || name === "ano"
          ? parseInt(value, 10)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validatedVehicle = vehicleSchema.parse(newVehicle);
      const vehicleToAdd = {
        ...validatedVehicle,
        id: nextVehicleId,
        timestamp_cadastro: Date.now(),
      } as Vehicle;

      const storedVehicles = localStorage.getItem("vehicles");
      const vehicles = storedVehicles ? JSON.parse(storedVehicles) : [];
      vehicles.push(vehicleToAdd);
      localStorage.setItem("vehicles", JSON.stringify(vehicles));

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

      toast.success("Veículo cadastrado com sucesso!");

      setValidationErrors([]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.errors);
      }
    }
  };

  const getErrorMessage = (field: string) => {
    const error = validationErrors.find((err) => err.path.includes(field));
    return error ? error.message : null;
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-6 border rounded-lg shadow-lg bg-white"
      >
        <InputField
          label="Marca"
          name="brand"
          type="text"
          value={newVehicle.brand || ""}
          onChange={handleChange}
          errorMessage={getErrorMessage("brand")}
        />
        <InputField
          label="Valor"
          name="valor"
          type="number"
          value={newVehicle.valor || ""}
          onChange={handleChange}
          errorMessage={getErrorMessage("valor")}
        />
        <InputField
          label="Combustível"
          name="combustivel"
          type="text"
          value={newVehicle.combustivel || ""}
          onChange={handleChange}
          errorMessage={getErrorMessage("combustivel")}
        />
        <InputField
          label="Cor"
          name="cor"
          type="text"
          value={newVehicle.cor || ""}
          onChange={handleChange}
          errorMessage={getErrorMessage("cor")}
        />
        <InputField
          label="Número de portas"
          name="num_portas"
          type="number"
          value={newVehicle.num_portas || ""}
          onChange={handleChange}
          errorMessage={getErrorMessage("num_portas")}
        />
        <InputField
          label="Ano"
          name="ano"
          type="number"
          value={newVehicle.ano || ""}
          onChange={handleChange}
          errorMessage={getErrorMessage("ano")}
        />
        <InputField
          label="Modelo"
          name="nome_modelo"
          type="text"
          value={newVehicle.nome_modelo || ""}
          onChange={handleChange}
          errorMessage={getErrorMessage("nome_modelo")}
        />
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Registrar Veículo
        </button>
      </form>
    </>
  );
};

export default VehicleForm;
