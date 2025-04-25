// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import servicesService from '../services/servicesService';
// import Button from '../components/common/Button';

// const ServiceDetailsLayout = () => {
//   const { condominiumId, serviceId } = useParams();
//   const [service, setService] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchService = async () => {
//       const result = await servicesService.getServiceById(condominiumId, serviceId);

//       if (result?.error) {
//         setError(result.error);
//       } else {
//         setService(result);
//       }

//       setLoading(false);
//     };

//     fetchService();
//   }, [condominiumId, serviceId]);

//   if (loading) return <p className="p-8 text-gray-500">A carregar...</p>;
//   if (error) return <p className="p-8 text-red-600">{error}</p>;
//   if (!service) return null;

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Detalhes do Serviço</h1>

//       <div className="flex gap-10 items-start flex-wrap md:flex-nowrap">
//         <img
//           src={service.avatar || '/default-avatar.png'}
//           alt="Prestador"
//           className="w-24 h-24 rounded-full object-cover"
//         />

//         <div className="space-y-4 max-w-2xl">
//           <h2 className="text-xl font-semibold text-gray-900">{service.name}</h2>

//           <div>
//             <p className="font-medium text-gray-700 mb-1">Descrição do serviço:</p>
//             <p className="text-gray-600">{service.description}</p>
//           </div>

//           <div>
//             <p className="font-medium text-gray-700 mb-1">Custo:</p>
//             <p className="text-gray-600">{service.cost}</p>
//           </div>

//           {service.warning && (
//             <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md border border-yellow-300">
//               ⚠️ <strong>Atenção:</strong> {service.warning}
//             </div>
//           )}

//           <div className="pt-4">
//             <Button label="Requisitar Serviço" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetailsLayout;