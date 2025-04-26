import AuthBackgroundVideo from "../components/common/AuthBackgroundVideo";
import ChooseCondBox from "../components/layout/ChooseCondBox";
import GoBackLayout from "../components/common/GoBack";

export default function NotFoundPage() {
    return (
        <>
            <div className="relative w-full h-screen overflow-hidden">
                <AuthBackgroundVideo/>

                <div className="relative flex items-center justify-center min-h-screen" >
                    <ChooseCondBox>
                        <GoBackLayout/>
                        <h3>A página  que tentou aceder não foi encontrada.</h3>
                    </ChooseCondBox>
                </div>
            </div>
        </>
    )
}