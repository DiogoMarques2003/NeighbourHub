import Button from '@common/Button';
import Popup from '@common/Popup';
import commonAreaService from '@services/commonAreaService';
import { useState } from 'react';
import { toast } from 'react-toastify';

const DeleteCommonAreaPopup = ({ commonArea, openPopup, setOpenPopup, onDeleted }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const result = await commonAreaService.deleteCommonArea(commonArea.condominiumId, commonArea.id);
    if (!result || result.error) {
      setIsLoading(false);
      toast.error(result?.error || 'Não foi possível eliminar a área comum');
      return;
    }

    setIsLoading(false);
    setOpenPopup(false);
    toast.success(result.message || 'Área comum eliminada com sucesso!');
    onDeleted();
  };

  return (
    <Popup
      openPopUp={openPopup}
      closePopUp={() => setOpenPopup(false)}
      popupTitle={'Eliminar área comum'}
      popupHandleSubmit={handleDelete}
    >
      <div>
        <p>
          Tens a certeza que queres eliminar a área comum <strong>{commonArea.name}</strong>?
        </p>
        <p>
          Esta ação <span className="font-bold">não pode ser desfeita</span>.
        </p>
      </div>

      <div className="flex items-center mt-3 space-x-2">
        <Button variant="secondary" fullWidth onClick={() => setOpenPopup(false)}>
          Cancelar
        </Button>
        <Button type="submit" variant="danger" fullWidth isLoading={isLoading}>
          Eliminar
        </Button>
      </div>
    </Popup>
  );
};

export default DeleteCommonAreaPopup;
