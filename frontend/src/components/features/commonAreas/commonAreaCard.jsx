import { useState } from 'react';
import noImageAvaliable from '../../../../public/images/no_image_avaliable.jpg'
import { getCommonAreaTypeName } from "../../../utils/helperFunctions"
import { Users, Banknote, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CardLayout from '@layout/CardLayout';

const CommonAreaCard = ({area}) => {
    const [imgSrc, setImgSrc] = useState(area?.images[0] || noImageAvaliable);
    const navigate = useNavigate();

    return (
        <div></div>
        
    )
}

export default CommonAreaCard;