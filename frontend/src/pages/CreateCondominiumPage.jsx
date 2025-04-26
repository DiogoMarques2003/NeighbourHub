import CreateCondominiumForm from "@features/condominium/createCondominium/CreateCondominiumForm";
import CentralBoxWithBackGroundVideo from "@layout/CentralBoxWithBackGroundVideo";
import GoBackLayout from "@layout/GoBackLayout";

export default function CreateCondominium() {
    return (
      <CentralBoxWithBackGroundVideo>
        <GoBackLayout/>
        <CreateCondominiumForm/>
      </CentralBoxWithBackGroundVideo>
    );
  }