import Popup from '@common/Popup.jsx';
import InputWithIcon from '@common/InputWithIcon.jsx';
import { Hammer, Circle, BookOpen } from 'lucide-react';
import { useState } from 'react';
import UploadFile from '@common/UploadFile.jsx';
import Button from '@common/Button.jsx';
import TextAreaWithIcon from '@common/TextAreaWithIcon';
import DropDown from '@common/DropDown';
import { ORDER_WORK_STATUS } from '@utils/constants';
import orderWorkService from '@services/orderWorkService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import ErrorBar from '@common/ErrorBar';

const OrderWorkPopup = ({ openPopup, setOpenPopup }) => {
  const [workDescription, setWorkDescription] = useState('');
  const [workStatus, setWorkStatus] = useState('');
  const [workFile, setWorkFile] = useState(null);
  const { condominiumId, orderId } = useParams();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const HandleRemovePopUp = () => {
    setWorkDescription('');
    setWorkStatus('');
    setWorkFile(null);
    setError('');
    setOpenPopup(false);
  };

  const validateForm = () => {
    if (!workDescription.trim()) {
      setError('Descrição é obrigatório!');
      return false;
    }
    if (!workStatus.trim()) {
      setError('Estado é obrigatório!');
      return false;
    }

    setError('');
    return true;
  };

  const handleClick = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    const orderData = new FormData();
    orderData.append('description', workDescription);
    orderData.append('status', workStatus);
    if (workFile) orderData.append('reportFile', workFile);

    const result = await orderWorkService.createOrderWork(condominiumId, orderId, orderData);
    console.log(result);
    if (!result || result.error) {
      toast.error(result?.error || 'Erro ao adicionar atualização ao pedido');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    HandleRemovePopUp();
    toast.success(result.message || 'Pedido atualizado com sucesso!');
  };

  return (
    <>
      <Popup openPopUp={openPopup} closePopUp={HandleRemovePopUp} popupTitle={'Adicionar Atualização ao pedido'}>
        <ErrorBar error={error}></ErrorBar>
        <DropDown
          listOptions={ORDER_WORK_STATUS}
          setChoice={(e) => setWorkStatus(e)}
          choice={workStatus}
          dropBoxPlaceHolder="Estado"
          icon={Circle}
        />
        <TextAreaWithIcon
          icon={BookOpen}
          type="text"
          name="description"
          placeholder="Descrição"
          value={workDescription}
          maxLength={255}
          onChange={(e) => setWorkDescription(e.target.value)}
        />
        <UploadFile filesAcceptance={'.pdf'} title={'Escolher Ficheiro'} file={workFile} setFile={setWorkFile} />
        <Button onClick={handleClick} isLoading={isLoading} fullWidth>
          Atualizar pedido
        </Button>
      </Popup>
    </>
  );
};

export default OrderWorkPopup;
