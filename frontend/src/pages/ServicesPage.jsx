import { useNavigate } from 'react-router-dom';
import CreateServiceForm from "../components/features/createService/CreateServiceForm";

const ServicesPage = () => {
    const navigate = useNavigate();

    return(
        <>
         <CreateServiceForm/>
        </>
    )
}

export default ServicesPage;