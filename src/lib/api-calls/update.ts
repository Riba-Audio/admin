import { getDoc, patchDoc, postDoc } from "@/utils/api-wrappers"


export const getAppVersion = async () => {
    let res = await getDoc("/utils/app/version", true); 
    return res?.data || false;
};

export const updateAppVersion = async (appVersion: string) => {
    let res = await patchDoc("/utils/app/version?role=admin", {appVersion}, true);
    return res?.status === "success"
}