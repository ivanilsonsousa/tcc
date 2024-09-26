import { fakeApi } from "@/api/fake";
import JSONPreview from "@/components/custom/JSONPreview";
import { ConfirmModal } from "@/components/custom/Modal/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/context/LoadingContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmPreview from "../confirm-preview";
import { CombinedFormData } from "./validationSchemas";
import { objectToFormData } from "@/utils";
import api from "@/api";

interface ConfirmProps {
  prevStep: () => void;
  formData: CombinedFormData;
}

const Confirm: React.FC<ConfirmProps> = ({ prevStep, formData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const getData = () => {
    const { files, general_context, params } = formData;
    const data = {
      files,
      general_context,
      dimensions: params.dimensions,
    };

    return data;
  };

  const handleSubmit = async () => {
    const data = getData();
    console.log("Dados submetidos:", data);

    const dataForm = objectToFormData(data);

    const response = await api.post("/challenge-submissions", dataForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // showLoading();
    // const response = await fakeApi(5, false);
    // hideLoading();

    const { data: result } = response;

    console.log("Resultado", result);

    navigate("/result", { state: result.output });
  };

  const handleConfirm = () => {
    setIsModalOpen(false);

    handleSubmit();
  };

  return (
    <div>
      <h2 className="mb-4 text-xl" >Confirme seus dados</h2>

      {/* <JSONPreview data={formData} /> */}

      <ConfirmPreview data={formData} />

      <div className="flex justify-between mt-10">
        <Button type="button" variant={"secondary"} onClick={prevStep}>
          Voltar
        </Button>
        <Button type="button" onClick={() => setIsModalOpen(true)}>
          Enviar
        </Button>
      </div>

      <ConfirmModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleConfirm}
        message="Deseja realizar a avaliação com os dados informados?"
      />
    </div>
  );
};

export default Confirm;
