import Popup from '@common/Popup.jsx';
import InputWithIcon from '@common/InputWithIcon.jsx';
import { Hammer, Text } from 'lucide-react';
import { useState } from 'react';
import UploadFile from '@common/UploadFile.jsx';
import Button from '@common/Button.jsx';

const OrderWorkPopup = ({openPopup, setOpenPopup}) => {
  const [workDescription, setWorkDescription] = useState('');
  const [error, setError] = useState('');

  const HandleRemovePopUp = () => {
    setWorkDescription('');
    setError('');
    setOpenPopup(false);
  };

  return (
    <>
      <Popup
        openPopUp={openPopup}
        closePopUp={HandleRemovePopUp}
        popupTitle={'Adicionar Atualização ao pedido'}
      >
        <InputWithIcon
          icon={Hammer}
          type="text"
          name="name"
          placeholder="Descrição"
          value={workDescription}
          onChange={(e) => setWorkDescription(e.target.value)}
        />
        <InputWithIcon
          icon={Hammer}
          type="text"
          name="name"
          placeholder="Estado"
          value={workDescription}
          onChange={(e) => setWorkDescription(e.target.value)}
        />
        <UploadFile />
        <Button fullWidth>
          Atualizar pedido
        </Button>
      </Popup>
    </>
  );
};

export default OrderWorkPopup;