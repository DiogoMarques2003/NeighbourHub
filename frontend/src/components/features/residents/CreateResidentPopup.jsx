import Button from "@common/Button";
import DropDown from "@common/DropDown";
import ErrorBar from "@common/ErrorBar";
import InputWithIcon from "@common/InputWithIcon";
import Popup from "@common/Popup";
import addressesService from "@services/addressesService";
import { HOUSE_TYPE_TYPES } from "@utils/constants";
import { handleFormDataChange } from "@utils/helperFunctions";
import { Building, Building2, Globe, Hash, Home, Mail, Mailbox, Route, User } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from 'react-toastify';

const CreateResidentPopup = ({ openPopup, setPopup }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const { currentUser, condominium } = useOutletContext();
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRemovePopUp = () => {
        setName('');
        setAddress('');
        setError('');
        setPopup(false);
    };

    const [formData, setFormData] = useState({
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      postalCode: '',
      houseType: 0,
      userEmail: ''
    });

    const isValidForm = () => {
        if(1 === 2) {
            setError("Por favor preencha todos os campos!");
            return false;
        }

        if(formData.houseType == 0 ) {
          setError("Por favor preencha o tipo da casa!");
          return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isValidForm()) return;

        setIsLoading(true);
        
        const result = await addressesService.createAddressByCondominium(condominium.id, formData);
        setIsLoading(false);

        if (result?.error || !result) {
            setError(result?.error || 'Não foi possivel criar serviço');
            return;
        }
        
        handleRemovePopUp();
        toast.success(result?.message || 'Morador criado com sucesso!');
    }

    return (
        <Popup openPopUp={openPopup} closePopUp={handleRemovePopUp} popupTitle={"Adicionar Morador"} popupHandleSubmit={handleSubmit}>

            {error && <ErrorBar error={error}/>}

            <InputWithIcon
              icon={Mail}
              type="email"
              name="userEmail"
              placeholder="Email"
              value={formData.userEmail}
              onChange={(e) => handleFormDataChange(e, setFormData)}
              required
            />

            <InputWithIcon
              icon={Route}
              type="text"
              name="street"
              placeholder="Rua"
              value={formData.street}
              onChange={(e) => handleFormDataChange(e, setFormData)}
              required
            />

            <InputWithIcon
              icon={Hash}
              type="text"
              name="houseNumber"
              placeholder="Número da casa"
              value={formData.houseNumber}
              onChange={(e) => handleFormDataChange(e, setFormData)}
              required
            />

            <InputWithIcon
              icon={Mailbox}
              type="text"
              name="postalCode"
              placeholder="Código postal"
              value={formData.postalCode}
              onChange={(e) => handleFormDataChange(e, setFormData)}
              required
            />

            <DropDown
              listOptions={HOUSE_TYPE_TYPES}
              setChoice={(e) => handleFormDataChange(e, setFormData, "houseType")}
              choice={formData.houseType}
              dropBoxPlaceHolder="Tipo de casa"
              icon={Building2}
            />

            <InputWithIcon
              icon={Globe}
              type="text"
              name="country"
              placeholder="País"
              value={formData.country}
              onChange={(e) => handleFormDataChange(e, setFormData)}
              required
            />

            <InputWithIcon
              icon={Building}
              type="text"
              name="city"
              placeholder="Cidade"
              value={formData.city}
              onChange={(e) => handleFormDataChange(e, setFormData)}
              required
            />

          <div className="mt-6">
            <Button type="submit" isLoading={isLoading} fullWidth>
              Criar novo morador
            </Button>
          </div>
        </Popup>
    )
}

export default CreateResidentPopup;