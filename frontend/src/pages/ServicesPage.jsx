import Button from "../components/common/Button";
import { useNavigate } from 'react-router-dom';
import Popup from "../components/common/Popup";
import { useState } from "react";

const ServicesPage = () => {
    const navigate = useNavigate();

    const [openPopup, setOpenPopup] = useState(false);

    const HandleRemovePopUp = () => setOpenPopup(false);

    return(
        <>
        <Button
        onClick={() => setOpenPopup(true)}
        >
            Criar novo  serviço
        </Button>
        <Popup openPopUp={openPopup} closePopUp={HandleRemovePopUp} />
        </>
    )
}

export default ServicesPage;