// logout modal 

import React from "react"; 
import { useRouter } from "next/navigation";
import { Modal } from "./modal";
import { Button } from "../ui/button";
import { useSignOut } from "@/auth/authHooks";
import { createToast } from "@/utils/toast";
import { removeLocalStorageItem } from "@/helpers/local-storage";


interface LogoutModalProps {
    isOpen: boolean; 
    onClose: () => void; 
}

const LogoutModal: React.FC<LogoutModalProps> = ({isOpen, onClose}) => {
    const signOut = useSignOut(); 
    const {push} = useRouter(); 

    const handleLogout = () => {
        createToast("success", "You have been logged out!");
        removeLocalStorageItem("sidebar"); 
        signOut(); 
        onClose();
        push("/login")
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Logout"
            description="Do you wish to logout from the platform. All your records will be cleared from the browser."
        >
            <div className="flex justify-end">
                <Button
                    variant={"destructive"}
                    onClick={handleLogout}
                >
                    Continue
                </Button>
            </div>
        </Modal>
    )
};

export default LogoutModal; 