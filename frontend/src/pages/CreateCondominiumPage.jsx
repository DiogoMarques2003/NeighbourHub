import CreateCondominiumForm from "@features/condominium/createCondominium/CreateCondominiumForm";
import CentralBoxWithBackGroundVideo from "@layout/CentralBoxWithBackGroundVideo";
import GoBackLayout from "@common/GoBack";

export default function CreateCondominium() {
    return (
      <CentralBoxWithBackGroundVideo>
        <GoBackLayout/>
        <CreateCondominiumForm/>
      </CentralBoxWithBackGroundVideo>
    );
  }