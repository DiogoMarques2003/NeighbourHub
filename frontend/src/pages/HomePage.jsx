import { useAuthContext } from "../hooks/useAuthContext";

export default function HomePage() {
    const { currentUser } = useAuthContext();

    return (
      <div>Home Page
        <h1>Olá {currentUser?.name || ''}</h1>
      </div>
    )
}