import UploadPhoto from "../../common/UploadPhoto";
import { useState } from 'react';
import { User, Mail, Phone, Lock, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../../hooks/useAuthContext";
import InputWithIcon from "../../common/InputWithIcon";
import Button from '../../common/Button';
import authService from "@services/authService";
import InputMaskWithIcon from "@common/InputMaskWithIcon";
import { toast } from 'react-toastify';
import { setToken } from "../../../utils/helperFunctions";

const RegisterForm = () => {
    const navigate = useNavigate();
    const { updateCurrentUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        iban: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
          setError('Nome é obrigatório');
          return false;
        }
        if (!formData.email.trim()) {
          setError('Email é obrigatório');
          return false;
        }
        if (!formData.phoneNumber.trim()) {
          setError('Número de telemóvel é obrigatório');
          return false;
        }
        if (!formData.password) {
          setError('Password é obrigatória');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('As passwords não correspondem');
          return false;
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
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('iban', formData.iban);
        formDataToSend.append('password', formData.password);
        
        // Append profile image if it exists
        if (profileImage) {
          formDataToSend.append('foto', profileImage);
        }
      
        const result = await authService.register(formDataToSend);
        if(!result || result.error) {
          setError(result.error || 'Falha no registo');
          setIsLoading(false);
          return;
        }

        updateCurrentUser(await authService.getCurrentUser(result?.token));

        navigate('/home');
        toast.success('Registration successful! 🎉', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsLoading(false);
    };

    const onImageChange = (file) => {
        setProfileImage(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
            </div>
            )}
            
            <UploadPhoto onImageChange={onImageChange}/>

            <div className="space-y-4">
          <InputWithIcon
            icon={User}
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <InputWithIcon
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <InputWithIcon
            icon={Phone}
            name="phoneNumber"
            type="tel"
            placeholder="Numero telefone"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            maxLength={9}
          />

          {/* <InputMaskWithIcon
            icon={Phone}
            name="phone"
            type="tel"
            placeholder="(351) 999 999 999"
            value={formData.iban}
            onChange={(e) => handleChange(e)}
            mask="(351) 999 999 999"
          /> */}

          <InputMaskWithIcon
            icon={CreditCard}
            name="iban"
            placeholder="PT__ ____ ____ ____ ____ __"
            value={formData.iban}
            onChange={(e) => handleChange(e)}
            mask="PT50 9999 9999 99999999999 99"
          />
          
          <div className="relative">
            <InputWithIcon
              icon={Lock}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="relative">
            <InputWithIcon
              icon={Lock}
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            type="submit" 
            isLoading={isLoading}
            fullWidth
          >
            Registar
          </Button>
        </div>
      </form>

    )
}

export default RegisterForm;