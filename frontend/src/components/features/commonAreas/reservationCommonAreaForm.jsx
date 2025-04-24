import { use, useEffect, useState } from "react";
import commonAreaService from "../../../services/commonAreaService";
import { useParams } from "react-router-dom";
import PhotoContainer from "../../common/PhotoContainer";
import Loading from "../../common/Loading";
import noImageAvaliable from '../../../../public/images/no_image_avaliable.jpg'
import ErrorBar from "../../common/ErrorBar";
import InputWithIcon from "../../common/InputWithIcon";
import { ArrowRight } from 'lucide-react';
import { COMMON_AREA_STATUS_ICONS } from "../../../utils/htmlConstants";
import CheckBox from "../../common/CheckBox";

const ReservationCommonAreaFrom = () => { 
    const [ isLoading, setIsLoading ] = useState(true)
    const [ areaData, setAreaData ] = useState('')
    const [ error, setError ] = useState('')
    const { condominiumId, commonAreaId } = useParams();

    useEffect(() => {
        const getData = async () => {
          setIsLoading(true);
          setError('');
          const result = await commonAreaService.getCommonAreaById(condominiumId, commonAreaId );
    
          console.log(result);
    
          if (result?.error || !result) {
            setError(result?.error || 'Não foi possivel encontrar o espaço desejado');
            setIsLoading(false);
            return;
          }
          
          //Set regras null
          result.rules ||= "Não há regras defenidas";

          setAreaData(result);
          setIsLoading(false);
        };
    
        getData();
    }, []);



    return(
        
        <>
            {isLoading ? (
                <Loading className="flex justify-center" />
            ) : error ? ( 
                <ErrorBar error={error}/>
            ) : ( 
                <>
                <div className="w-full min-h-screen flex">
                    <div className="flex flex-col md:w-1/2 gap-3 h-full">
                        <PhotoContainer type="square_large" previewUrlImage={areaData.images[0] ? areaData.images[0] : noImageAvaliable} />

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <PhotoContainer type="square_normal" previewUrlImage={areaData.images[1] ? areaData.images[1] : noImageAvaliable  } />
                            </div>
                            <div className="flex-1">
                                <PhotoContainer type="square_normal" previewUrlImage={areaData.images[2] ? areaData.images[2] : noImageAvaliable } />
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 px-5" >
                        <h1 class="text-3xl font-bold font-app-color pb-4">{areaData.name}</h1>
                        {COMMON_AREA_STATUS_ICONS[areaData.status]}
                        <div className="flex justify-stretch py-4">
                        <InputWithIcon
                            icon={null}
                            type="date"
                            name="endSchedule"
                            placeholder="Hora de fim"
                            required
                        />
                        <InputWithIcon
                            icon={null}
                            type="time"
                            name="endSchedule"
                            placeholder="Hora de fim"
                            required
                        />
                        <InputWithIcon
                            icon={null}
                            type="time"
                            name="endSchedule"
                            placeholder="Hora de fim"
                            required
                        />
                        </div>
                        <h1 className="text-2xl font-bold font-app-color pt-4 pb-2">Regras</h1>
                        <ul>
                            {areaData.rules.split('\n').map((rules) => (
                                <li className="flex p-1"> <ArrowRight color="#3E94BF" className="mx-2" /> {rules}</li>
                            ))}
                        </ul>
                        <CheckBox className="pt-4" description="Li e aceito as regras"/>
                    </div>
                </div>  
                </>
            )} 
            
        </>
    )
}

export default ReservationCommonAreaFrom;