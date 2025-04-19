import CreateCondominiumForm from "../components/features/createCondominium/CreateCondominiumForm";
import CentralBoxWithBackGroundVideo from "../components/layout/CentralBoxWithBackGroundVideo";
import GoBackLayout from "../components/layout/GoBackLayout";

export default function CreateCondominium() {
    return (
      <CentralBoxWithBackGroundVideo>
        <GoBackLayout/>
        <CreateCondominiumForm/>
      </CentralBoxWithBackGroundVideo>
    );
  }