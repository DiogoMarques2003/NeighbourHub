import { use, useEffect, useState } from 'react';
import commonAreaService from '../../../services/commonAreaService';
import { useOutletContext, useParams } from 'react-router-dom';
import PhotoContainer from '../../common/PhotoContainer';
import Loading from '../../common/Loading';
import noImageAvaliable from '../../../../public/images/no_image_avaliable.jpg';
import ErrorBar from '../../common/ErrorBar';
import InputWithIcon from '../../common/InputWithIcon';
import { ArrowRight, Banknote, Clock, Users } from 'lucide-react';
import { COMMON_AREA_STATUS_ICONS } from '../../../utils/htmlConstants';
import CheckBox from '../../common/CheckBox';
import Button from '../../common/Button';
import commonAreaReservation from '../../../services/commonAreaReservation';
import { toast } from 'react-toastify';

const ReservationCommonAreaFrom = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [areaData, setAreaData] = useState('');
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const { condominiumId, commonAreaId } = useParams();
  const { condominium } = useOutletContext();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError('');
      const result = await commonAreaService.getCommonAreaById(condominiumId, commonAreaId);

      console.log(result);

      if (result?.error || !result) {
        setError(result?.error || 'Não foi possivel encontrar o espaço desejado');
        setIsLoading(false);
        return;
      }

      //Set regras null
      result.rules ||= 'Não há regras defenidas';

      setAreaData(result);
      setIsLoading(false);
    };

    getData();
  }, []);

  const validateForm = () => {
    if (!date.trim()) {
      toast.error('É obrigatório escolher uma data');
      return false;
    }
    if (!startTime.trim()) {
      toast.error('Insira um horário');
      return false;
    }
    if (!endTime.trim()) {
      toast.error('Insira um horário');
      return false;
    }
    if (!checkbox) {
      toast.error('Obrigatório aceitar as regras');
      return false;
    }
    setError('');
    return true;
  };

  const createReservation = async () => {
    if (!validateForm()) return;
    setIsLoadingButton(true);

    const reservation = {
      startDate: new Date(`${date}T${startTime}:00`),
      endDate: new Date(`${date}T${endTime}:00`),
    };

    const result = await commonAreaReservation.postCreateReservation(reservation, condominiumId, commonAreaId);

    if (result?.error || !result) {
      toast.error(result?.error || 'Não foi criar reserva');
      setIsLoadingButton(false);
      return;
    }

    setIsLoadingButton(false);
    toast.success(result?.message || 'Reserva registada com sucesso!');
  };

  return (
    <>
      {isLoading ? (
        <Loading className="flex justify-center" />
      ) : error && !areaData ? (
        <ErrorBar error={error} />
      ) : (
        <>
          <div className="w-full min-h-screen flex">
            <div className="flex flex-col md:w-1/2 gap-3 h-full">
              <PhotoContainer
                type="square_large"
                previewUrlImage={areaData.images[0] ? areaData.images[0] : noImageAvaliable}
              />

              <div className="flex gap-3">
                <div className="flex-1">
                  <PhotoContainer
                    type="square_normal"
                    previewUrlImage={areaData.images[1] ? areaData.images[1] : noImageAvaliable}
                  />
                </div>
                <div className="flex-1">
                  <PhotoContainer
                    type="square_normal"
                    previewUrlImage={areaData.images[2] ? areaData.images[2] : noImageAvaliable}
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 px-5">
              <h1 class="text-3xl font-bold font-app-color pb-4">{areaData.name}</h1>
              {COMMON_AREA_STATUS_ICONS[areaData.status]}

              {/* INFORMAÇÃO */}
              <div className="mt-3 justify-between flex-col items-center gap-3 text-gray-600 sm:text-md">
                <div className="flex items-center ">
                  <h1 className="pr-2 font-medium">Capacidade: </h1>
                  <span className="pr-2">{areaData.capacity}</span>
                  <Users size={20} className="mr-2" />
                </div>
                {areaData.cost > 0 && (
                  <>
                    <div className="flex items-center">
                      <h1 className="pr-2 font-medium">Custo:</h1>
                      <span>{areaData.cost.toFixed(2)}€</span>
                    </div>
                  </>
                )}
                <div className="flex items-center">
                  <h1 className="pr-2 font-medium">Horário:</h1>
                  <span className="pr-2">{areaData.startSchedule} - {areaData.endSchedule} </span>
                  <Clock size={20} className="mr-1" />
                </div>
              </div>

              {areaData.status == 'READY' && condominium.isResident && (
                <>
                  <h1 className="text-gray-600 sm:text-md font-medium">Reservar:</h1>
                  <div className="flex justify-start pt-2 pb-2 items-center">
                    <InputWithIcon
                      icon={null}
                      type="date"
                      name="date"
                      required
                      className="pr-4"
                      value={date}
                      onChange={(e) => (setDate(e.target.value))}
                    />
                    <InputWithIcon
                      icon={null}
                      type="time"
                      name="startSchedule"
                      required
                      className="pr-4"
                      value={startTime}
                      onChange={(e) => (setStartTime(e.target.value))}
                    />
                    <p className="pr-4">até</p>
                    <InputWithIcon
                      icon={null}
                      type="time"
                      name="endSchedule"
                      required
                      className="pr-4"
                      value={endTime}
                      onChange={(e) => (setEndTime(e.target.value))}
                    />
                  </div>
                </>
              )}
              <h1 className="text-2xl font-bold font-app-color pt-4 pb-2">Regras</h1>
              <ul>
                {areaData.rules.split('\n').map((rules) => (
                  <li className="flex p-1">
                    <ArrowRight color="#3E94BF" className="mx-2" /> {rules}
                  </li>
                ))}
              </ul>
              {areaData.status == 'READY' && condominium.isResident && (
                <>
                  <CheckBox className="pt-4" description="Li e aceito as regras" checkBox={checkbox}
                            handleCheckbox={setCheckbox} />
                  <Button type="submit" isLoading={isLoadingButton} fullWidth onClick={createReservation}>
                    Reservar Espaço
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReservationCommonAreaFrom;
