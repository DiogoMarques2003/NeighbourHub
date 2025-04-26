import { useNavigate } from 'react-router-dom';
import CreateServiceForm from "@features/services/createService/CreateServiceForm";

const ServicesPage = () => {
    const navigate = useNavigate();

    return(
        <>
         <CreateServiceForm/>
        </>
    )
}

export default ServicesPage;