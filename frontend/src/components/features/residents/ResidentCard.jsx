import PhotoContainer from "@common/PhotoContainer";
import CardLayout from "@layout/CardLayout";
import defaultAvatar from "@public/images/defaultUserAvatar.jpg"
import { Mail, Phone, PhoneCall } from "lucide-react";

const ResidentCard = ({ resident }) => {

    const { user, street, houseNumber, postalCode, city, country } = resident;
    
    return (
      <CardLayout item={resident}>
        <div className="w-full h-48 bg-gray-200 overflow-hidden">
            <img 
                src={user.foto ? user.foto : defaultAvatar} 
                alt="Resident" 
                className="w-full h-full object-cover"
            />
        </div>
        
        <div className="p-4 flex-grow">
          <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">
            {user.name}
          </h3>
          
          <div className="text-sm text-gray-600">
            <p className="mb-1">{street} {houseNumber}</p>
            <p>{postalCode}, {city}</p>
            <p>{country}</p>
          </div>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between">
          {user?.phoneNumber && (
            <a href={`tel:${user.phoneNumber}`} className="text-blue-500 flex items-center text-sm">
              <Phone size="16" className="mr-1"/>
              Call
            </a>
          )}
          
          <a href={`mailto:${user?.email}`} className="text-blue-500 flex items-center text-sm">
            <Mail size="16" className="mr-1"/>
            Email
          </a>
        </div>
    </CardLayout>
    );
};

export default ResidentCard;