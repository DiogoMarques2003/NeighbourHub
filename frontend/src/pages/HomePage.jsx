import { useAuthContext } from "../hooks/useAuthContext";

export default function HomePage() {
    const { currentUser, logout } = useAuthContext();
    return (
        <div>Home Page
            <h1>Olá {currentUser.name}</h1>
            <button onClick={logout}>Logout</button>
        </div>

        
    )
}