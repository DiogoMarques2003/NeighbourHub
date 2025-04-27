// import { useState } from 'react';
// import Button from '@common/Button';
// import InputWithIcon from '@common/InputWithIcon';
// import Popup from '@common/Popup';
// import { Hammer, Text, Euro } from 'lucide-react';
// import servicesService from '@services/servicesService';
// import ErrorBar from '@common/ErrorBar';
// import { toast } from 'react-toastify';
// import { useOutletContext } from 'react-router-dom';
// import TitleWithAddButton from '@common/TitleWithAddButton';
// import Title from '@common/Title';

import Button from '@common/Button';
import ErrorBar from '@common/ErrorBar';
import InputWithIcon from '@common/InputWithIcon';
import Popup from '@common/Popup';
import servicesService from '@services/servicesService';
import { Euro, Hammer, Text } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

// const CreateServiceForm = () => {
//   const [serviceName, setServiceName] = useState('');
//   const [serviceDesc, setServiceDesc] = useState('');
//   const [servicePrice, setServicePrice] = useState('');
//   const { condominium } = useOutletContext();
//   const [openPopup, setOpenPopup] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const HandleRemovePopUp = () => {
//     setServiceName('');
//     setServiceDesc('');
//     setServicePrice('');
//     setError('');
//     setOpenPopup(false);
//   };

//   const validateForm = () => {
//     if (!serviceName.trim()) {
//       setError('Nome é obrigatório');
//       return false;
//     }
//     if (!serviceDesc.trim()) {
//       setError('Email é obrigatório');
//       return false;
//     }
//     setError('');
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsLoading(true);

//     const serviceData = {
//       name: serviceName,
//       description: serviceDesc,
//       cost: servicePrice && Number(servicePrice),
//     };

//     const result = await servicesService.postCreateService(serviceData, condominium.id);

//     if (result?.error || !result) {
//       setError(result?.error || 'Não foi possivel criar serviço');
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(false);
//     HandleRemovePopUp();
//     toast.success(result?.message || 'Serviço criado!');
//   };

//   return (
//     <>

//       <Popup
//         openPopUp={openPopup}
//         closePopUp={HandleRemovePopUp}
//         popupTitle={'Novo Serviço'}
//         popupHandleSubmit={handleSubmit}
//       >
//         {error && <ErrorBar error={error} />}
//         <InputWithIcon
//           icon={Hammer}
//           type="text"
//           name="name"
//           placeholder="Nome do serviço"
//           value={serviceName}
//           onChange={(e) => setServiceName(e.target.value)}
//         />
//         <InputWithIcon
//           icon={Text}
//           type="text"
//           name="desc"
//           placeholder="Descrição"
//           value={serviceDesc}
//           onChange={(e) => setServiceDesc(e.target.value)}
//         />
//         <InputWithIcon
//           icon={Euro}
//           type="text"
//           name="name"
//           placeholder="Preço"
//           value={servicePrice}
//           onChange={(e) => setServicePrice(e.target.value)}
//         />
//         <div className="mt-6">
//           <Button type="submit" isLoading={isLoading} fullWidth>
//             Criar novo serviço
//           </Button>
//         </div>
//       </Popup>
//     </>
//   );
// };

// export default CreateServiceForm;

const CreateServicePopup = ({ openPopup, setOpenPopup }) => {
  const { condominium } = useOutletContext();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [servicePrice, setServicePrice] = useState('');

  const HandleRemovePopUp = () => {
    setServiceName('');
    setServiceDesc('');
    setServicePrice('');
    setError('');
    setOpenPopup(false);
  };

  const validateForm = () => {
    if (!serviceName.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    if (!serviceDesc.trim()) {
      setError('Email é obrigatório');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const serviceData = {
      name: serviceName,
      description: serviceDesc,
      cost: servicePrice && Number(servicePrice),
    };

    const result = await servicesService.postCreateService(serviceData, condominium.id);

    if (result?.error || !result) {
      setError(result?.error || 'Não foi possivel criar serviço');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    HandleRemovePopUp();
    toast.success(result?.message || 'Serviço criado!');
  };

  return (
    <>
      <Popup
        openPopUp={openPopup}
        closePopUp={HandleRemovePopUp}
        popupTitle={'Novo Serviço'}
        popupHandleSubmit={handleSubmit}
      >
        {error && <ErrorBar error={error} />}
        <InputWithIcon
          icon={Hammer}
          type="text"
          name="name"
          placeholder="Nome do serviço"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        <InputWithIcon
          icon={Text}
          type="text"
          name="desc"
          placeholder="Descrição"
          value={serviceDesc}
          onChange={(e) => setServiceDesc(e.target.value)}
        />
        <InputWithIcon
          icon={Euro}
          type="text"
          name="name"
          placeholder="Preço"
          value={servicePrice}
          onChange={(e) => setServicePrice(e.target.value)}
        />
        <div className="mt-6">
          <Button type="submit" isLoading={isLoading} fullWidth>
            Criar novo serviço
          </Button>
        </div>
      </Popup>
    </>
  );
};

export default CreateServicePopup;
