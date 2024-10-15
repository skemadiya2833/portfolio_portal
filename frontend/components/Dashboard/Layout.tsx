import { ToastContainer } from "react-toastify";
import DashboardHeader from "./Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                rtl={false} />
            <DashboardHeader />
            {children}
        </>
    )
}