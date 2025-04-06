import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";



// Create a root layout component
function RootLayout() {
    return (
        <>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
                <Header />
                {/* <div className="animated-bg fixed -z-10 inset-0 opacity-100" /> */}
                <Outlet /> {/* This is where route components will render */}
                <Toaster richColors />
                <footer className="gradient-background2 py-12 bg-opacity-20">
                    <div className="mx-auto px-4 text-center text-gray-300">
                        <p>
                            © {new Date().getFullYear()} CodeNow101. All Rights Reserved
                        </p>
                    </div>
                </footer>
            </GoogleOAuthProvider>

        </>
    );
}
export default RootLayout;