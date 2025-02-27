// update modal 

import React from "react";
import { Modal } from "./modal";
import { createToast } from "@/utils/toast";
import { updateAppVersion } from "@/lib/api-calls/update";
import AppInput from "../common/app-input";
import { Button } from "../ui/button";


interface UpdateModalProps {
    isOpen: boolean; 
    onClose: () => void; 
    setVersion: React.Dispatch<string>; 
}; 


const UpdateModal: React.FC<UpdateModalProps> = ({isOpen, onClose, setVersion}) => {
    const [appVersion, setAppVersion] = React.useState<string>(""); 
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleUpdateVersion = async () => {
        if (!appVersion) {
            createToast("error", "App version not provided!");
            return;
        };
        setLoading(true);
        let res = await updateAppVersion(appVersion);
        if (res) {
            createToast("success", "App version has been updated!");
            setVersion(appVersion)
            onClose();
        };
        setLoading(false)
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Update app version"
            description="Update the app version to prompt users for an update. This is done each time there is an update to the server code!"
        >
            <AppInput
                value={appVersion}
                setValue={setAppVersion}
                placeholder={"2.0.0"}
                label="Latest app version"
                disabled={loading}
            />
            <Button
                onClick={handleUpdateVersion}
                disabled={loading}
                className="w-full my-3"
            >
                Update version
            </Button>
        </Modal>
    )
};

export default UpdateModal; 