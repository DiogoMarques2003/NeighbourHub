import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import commonAreaService from '../../../services/commonAreaService';
import { toast } from 'react-toastify';
import Loading from '../../common/Loading';
import InputWithIcon from '../../common/InputWithIcon';
import { Banknote, BookOpen, MapPin, Users } from 'lucide-react';
import DropDown from '../../common/DropDown';
import { COMMON_AREA_TYPES } from '../../../utils/constants';
import TextAreaWithIcon from '../../common/TextAreaWithIcon';
import EditPhoto from '../../common/Edithoto';
import Button from '../../common/Button';

const EditCommonAreaForm = () => {
  const { condominiumId, commonAreaId } = useParams();
  const { isAdmin } = useOutletContext();
  const navigate = useNavigate();

  const [commonAreaData, setCommonAreaData] = useState(null);

  const [name, setName] = useState('');
  const [startSchedule, setStartSchedule] = useState('');
  const [endSchedule, setEndSchedule] = useState('');
  const [cost, setCost] = useState(0);
  const [rules, setRules] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [type, setType] = useState(0);
  const [images, setImages] = useState([null, null, null]);

  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const getData = async () => {
    if (!isAdmin) {
      toast.error('Não tens permissão para editar este espaço');
      setIsLoading(false);
      navigate(-1);
      return;
    }

    const result = await commonAreaService.getCommonAreaById(condominiumId, commonAreaId);

    if (!result || result.error) {
      toast.error(result?.error || 'Não foi possivel encontrar o espaço desejado');
      setIsLoading(false);
      navigate(-1);
      return;
    }

    setCommonAreaData(result);
    setName(result.name);
    setStartSchedule(result.startSchedule);
    setEndSchedule(result.endSchedule);
    setCost(result.cost);
    setRules(result.rules);
    setCapacity(result.capacity);
    setType(result.type);
    setImages([result.images[0] || null, result.images[1] || null, result.images[2] || null]);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const imageChangeHandler = (file, index) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const validateForm = () => {
    if (!name.trim()) {
      toast.error('Nome é obrigatório');
      return false;
    }

    if (!startSchedule.trim()) {
      toast.error('Hora de início é obrigatória');
      return false;
    }

    if (!endSchedule.trim()) {
      toast.error('Hora de fim é obrigatória');
      return false;
    }

    if (cost < 0) {
      toast.error('Custo deve ser maior ou igual a 0');
      return false;
    }

    if (capacity <= 0) {
      toast.error('Capacidade deve ser maior que 0');
      return false;
    }

    if (type === 0) {
      toast.error('Tipo de espaço é obrigatório');
      return false;
    }

    if (!images.filter((img) => img).length) {
      toast.error('Pelo menos uma imagem é obrigatória');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setButtonLoading(true);

    const formData = new FormData();
    if (name !== commonAreaData.name) formData.append('name', name);
    if (startSchedule !== commonAreaData.startSchedule) formData.append('startSchedule', startSchedule);
    if (endSchedule !== commonAreaData.endSchedule) formData.append('endSchedule', endSchedule);
    if (cost !== commonAreaData.cost) formData.append('cost', cost);
    if (rules !== commonAreaData.rules) formData.append('rules', rules);
    if (capacity !== commonAreaData.capacity) formData.append('capacity', capacity);
    if (type !== commonAreaData.type) formData.append('type', type);

    // Validar quais imagens foram apagadas/adicionadas
    for (let i = 0; i < images.length; i++) {
      if (!images[i] && commonAreaData.images[i]) {
        formData.append('imagesRemove', commonAreaData.images[i]);
      } else if (images[i] && !commonAreaData.images[i]) {
        formData.append('imagesAdd', images[i]);
      } else if (images[i] && images[i] !== commonAreaData.images[i]) {
        formData.append('imagesAdd', images[i]);
        formData.append('imagesRemove', commonAreaData.images[i]);
      }
    }

    console.log('images ADd', formData.getAll('imagesAdd'));
    console.log('images Remove', formData.getAll('imagesRemove'));

    const result = await commonAreaService.updateCommonArea(condominiumId, commonAreaId, formData);
    if (!result || result.error) {
      toast.error(result?.error || 'Erro ao atualizar o espaço');
      setButtonLoading(false);
      return;
    }

    setButtonLoading(false);
    toast.success(result.message || 'Espaço atualizado com sucesso!');
    navigate(-1);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {isLoading ? (
        <Loading className="flex justify-center" />
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 space-y-4">
              <InputWithIcon
                icon={MapPin}
                type="text"
                name="name"
                placeholder="Nome do espaço"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <DropDown
                listOptions={COMMON_AREA_TYPES}
                setChoice={(e) => setType(e.target.value)}
                choice={type}
                dropBoxPlaceHolder="Tipo de espaço"
                icon={MapPin}
              />

              <InputWithIcon
                icon={Banknote}
                type="number"
                name="cost"
                placeholder="Custo (p/hr)"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                min={0}
              />

              <InputWithIcon
                icon={Users}
                type="number"
                name="capacity"
                placeholder="Capacidade total"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                min={1}
                required
              />

              <TextAreaWithIcon
                icon={BookOpen}
                type="text"
                name="rules"
                placeholder="Regras"
                value={rules}
                onChange={(e) => setRules(e.target.value)}
              />

              <div className="flex flex-col lg:flex-row justify-center space-x-6 space-y-4 lg:space-y-0">
                <div className="flex items-center">
                  <label for="startSchedule" className="mr-2 w-28 lg:w-auto">
                    Hora de início:{' '}
                  </label>
                  <InputWithIcon
                    type="time"
                    name="startSchedule"
                    placeholder="Hora de início"
                    value={startSchedule}
                    onChange={(e) => setStartSchedule(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center">
                  <label for="endSchedule" className="mr-2 w-28 lg:w-auto">
                    Hora de fim:{' '}
                  </label>
                  <InputWithIcon
                    type="time"
                    name="endSchedule"
                    placeholder="Hora de fim"
                    value={endSchedule}
                    onChange={(e) => setEndSchedule(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="flex flex-col gap-3">
                <EditPhoto
                  type="square_large"
                  onImageChange={(e) => imageChangeHandler(e, 0)}
                  previewUrlImage={images[0]}
                  showRemove
                />
                <div className="flex gap-3">
                  <div className="flex-1">
                    <EditPhoto
                      type="square_normal"
                      onImageChange={(e) => imageChangeHandler(e, 1)}
                      previewUrlImage={images[1]}
                      showRemove
                    />
                  </div>
                  <div className="flex-1">
                    <EditPhoto
                      type="square_normal"
                      onImageChange={(e) => imageChangeHandler(e, 2)}
                      previewUrlImage={images[2]}
                      showRemove
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-9 flex justify-center max-w-[400px] mx-auto">
            <Button type="submit" isLoading={buttonLoading} fullWidth>
              Criar Espaço
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default EditCommonAreaForm;
