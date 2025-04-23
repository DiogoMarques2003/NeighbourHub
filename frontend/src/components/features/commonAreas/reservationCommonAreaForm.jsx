import { use, useEffect, useState } from "react";
import commonAreaService from "../../../services/commonAreaService";
import { useParams } from "react-router-dom";
import PhotoContainer from "../../common/PhotoContainer";
import Loading from "../../common/Loading";
import noImageAvaliable from '../../../../public/images/no_image_avaliable.jpg'
import ErrorBar from "../../common/ErrorBar";

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
                <div className="w-full md:w-1/2">
                    <div className="flex flex-col gap-3">
                        <PhotoContainer type="square_large" previewUrlImage={areaData.images[0]} />

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <PhotoContainer type="square_normal" previewUrlImage={areaData.images[1] ? areaData.images[1] : noImageAvaliable  } />
                            </div>
                            <div className="flex-1">
                                <PhotoContainer type="square_normal" previewUrlImage={areaData.images[2] ? areaData.images[2] : noImageAvaliable } />
                            </div>
                        </div>
                    </div>
                </div>  
                </>
            )} 
            
        </>
    )
}

export default ReservationCommonAreaFrom;