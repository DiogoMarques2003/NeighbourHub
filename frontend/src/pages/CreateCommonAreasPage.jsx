import { useOutletContext } from "react-router-dom";
import Title from "../components/common/Title";
import CreateCommonAreaForm from "../components/features/commonAreas/CreateCommonAreaForm";

const CreateCommonAreasPage = () => {
    const { currentUser, condominium, isAdmin } = useOutletContext();

    return (
        <div>
            <Title title="Criar Área Comum" />
            <CreateCommonAreaForm condominium={condominium}></CreateCommonAreaForm>
        </div>
    )
};

export default CreateCommonAreasPage;