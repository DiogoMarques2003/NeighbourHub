import { useState } from "react";
import InputWithIcon from "@common/InputWithIcon";
import { MapPin, Banknote, Users, BookOpen } from 'lucide-react';
import { handleFormDataChange } from "../../../utils/helperFunctions.js";
import TextAreaWithIcon from "../../common/TextAreaWithIcon.jsx";
import UploadPhoto from "../../common/UploadPhoto.jsx";
import Button from "../../common/Button.jsx";
import DropDown from "../../common/DropDown.jsx";
import { COMMON_AREA_TYPES } from "../../../utils/constants.js";
import commonAreaService from "../../../services/commonAreaService.js";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from 'react-toastify';
import ErrorBar from "../../common/ErrorBar.jsx";


const CreateCommonAreaForm = ({condominium}) => {
    /* const { currentUser, condominium, isAdmin } = useOutletContext(); */

    const [formData, setFormData] = useState({
        name: "",
        startSchedule: "",
        endSchedule: "",
        cost: "", // number but placeholder workaround
        rules: "",
        capacity: "", // number but placeholder workaround
        type: 0,
    });

    const [imageFiles, setImageFiles] = useState([null, null, null]);
    const [imagePreviews, setImagePreviews] = useState([null, null, null]);
    

    const [startDate, setStartDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleImageUpload = (file, index) => {
        if (file) {
            // Store the actual file object
            const newFiles = [...imageFiles];
            newFiles[index] = file;
            setImageFiles(newFiles);
            
            // Create URL for preview
            const newPreviews = [...imagePreviews];
            newPreviews[index] = URL.createObjectURL(file);
            setImagePreviews(newPreviews);
        }
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('Nome é obrigatório');
            return false;
        }
        if (formData.type === 0) {
            setError('Tipo de espaço é obrigatório');
            return false;
        }
        if (!formData.capacity) {
            setError('Capacidade total é obrigatório');
            return false;
        }

        if (formData.startSchedule && formData.endSchedule) {
            if (formData.endSchedule <= formData.startSchedule) {
                setError('A hora de fim deve ser posterior à hora de início');
                return false;
            }
        }

        setError('');
        return true;
    };
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        
        // Create FormData object to handle binary image upload
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('startSchedule', formData.startSchedule);
        formDataToSend.append('endSchedule', formData.endSchedule);
        formDataToSend.append('cost', formData.cost);
        formDataToSend.append('rules', formData.rules);
        formDataToSend.append('capacity', formData.capacity);
        formDataToSend.append('type', formData.type);
        
        // Append images if they exist (adding actual file objects)
        imageFiles.forEach((file, index) => {
            if (file) {
                formDataToSend.append('images', file);
            }
        });
        
        const result = await commonAreaService.createCommonArea(condominium.id, formDataToSend);
        if(!result || result?.error) {
            setError(result?.error || 'Falha na criação');
            setIsLoading(false);
            return;
        }

        
        navigate(`/condominium/${condominium.id}/commonarea`);

        toast.success(result?.message || 'Área comum criada com sucesso!');
        setIsLoading(false);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <ErrorBar error={error}/>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 space-y-4">
                    <InputWithIcon
                        icon={MapPin}
                        type="text"
                        name="name"
                        placeholder="Nome do espaço"
                        value={formData.name}
                        onChange={(e) => handleFormDataChange(e, setFormData)}
                        required
                    />

                    <DropDown
                        listOptions={COMMON_AREA_TYPES}
                        setChoice={(e) => handleFormDataChange(e, setFormData, "type")}
                        choice={formData.type}
                        dropBoxPlaceHolder = "Tipo de espaço"
                        icon={MapPin}
                    />

                    <InputWithIcon
                        icon={Banknote}
                        type="number"
                        name="cost"
                        placeholder="Custo (p/hr)"
                        value={formData.cost}
                        onChange={(e) => handleFormDataChange(e, setFormData)}
                        min={0}
                    />

                    <InputWithIcon
                        icon={Users}
                        type="number"
                        name="capacity"
                        placeholder="Capacidade total"
                        value={formData.capacity}
                        required
                        onChange={(e) => handleFormDataChange(e, setFormData)}
                        min={1}
                    />

                    <TextAreaWithIcon
                        icon={BookOpen}
                        type="text"
                        name="rules"
                        placeholder="Regras"
                        value={formData.rules}
                        onChange={(e) => handleFormDataChange(e, setFormData)}
                    />

                    <div className="flex flex-col lg:flex-row justify-center space-x-6 space-y-4 lg:space-y-0">
                        <div className="flex items-center">
                            <label for="startSchedule" className="mr-2 w-28 lg:w-auto">Hora de início: </label>
                            <InputWithIcon
                                icon={null}
                                type="time"
                                name="startSchedule"
                                placeholder="Hora de início"
                                value={formData.startSchedule}
                                required
                                onChange={(e) => handleFormDataChange(e, setFormData)}
                            />
                        </div>

                        <div className="flex items-center">
                            <label for="endSchedule" className="mr-2 w-28 lg:w-auto">Hora de fim: </label>
                            <InputWithIcon
                                icon={null}
                                type="time"
                                name="endSchedule"
                                placeholder="Hora de fim"
                                value={formData.endSchedule}
                                required
                                onChange={(e) => handleFormDataChange(e, setFormData)}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <div className="flex flex-col gap-3">
                        <UploadPhoto 
                            type="square_large"
                            onImageChange={(e) => handleImageUpload(e, 0)}
                            previewUrl={imagePreviews[0]}
                        />

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <UploadPhoto 
                                    type="square_normal"
                                    onImageChange={(e) => handleImageUpload(e, 1)}
                                    previewUrl={imagePreviews[1]}
                                />
                            </div>
                            <div className="flex-1">
                                <UploadPhoto 
                                    type="square_normal"
                                    onImageChange={(e) => handleImageUpload(e, 2)}
                                    previewUrl={imagePreviews[2]}
                                />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="mt-9 flex justify-center max-w-[400px] mx-auto">
                <Button 
                    type="submit" 
                    isLoading={isLoading}
                    fullWidth
                >
                    Criar Espaço
                </Button>
            </div>
    </form>
    )
};

export default CreateCommonAreaForm;