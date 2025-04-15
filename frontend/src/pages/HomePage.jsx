import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export default function HomePage() {
    const { currentUser, condominium } = useOutletContext();

    return (
      <div>Home Page
        <h1>Olá {currentUser?.name || ''}</h1>
      </div>
    )
}