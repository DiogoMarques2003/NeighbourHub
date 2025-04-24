import { CircleCheck, Hammer, CircleX } from 'lucide-react';

const COMMON_AREA_STATUS_ICONS = {
    READY: ( 
        <span className='flex items-center'> <CircleCheck color='green' className='mr-2 text-color-red' size={22}/> Disponível </span>
      ),
    MANUT: (
      <span className='flex items-center'> <Hammer color='#ffd500' className='mr-2 text-color-red' size={22}/> Em manutenção </span>
    ),
    INACT: (
      <span className='flex items-center'> <CircleX color='red' className='mr-2 text-color-red' size={22}/> Inativo </span>
    )
}
export { COMMON_AREA_STATUS_ICONS };