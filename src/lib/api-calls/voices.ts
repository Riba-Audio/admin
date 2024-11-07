// voices

import { deleteDoc, getDoc, patchDoc, postDoc } from "@/utils/api-wrappers"; 

// load voices
export const loadVoices = async () => {
    let res = await postDoc("/voices/load?role=admin", {}, true);
    return res?.status === "success";
}

// get voices 
export const getVoices = async () => {
    let res = await getDoc("/voices?role=admin", true);
    return res?.data || false; 
};

// edit voice 
export const updateVoice = async (voiceId: string, data: any) => {
    let res = await patchDoc(`/voices/${voiceId}?role=admin`, data, true);
    return res?.status === "success"; 
};

// add voice
export const postVoice = async (data: any) => {
    let res = await postDoc(`/voices?role=admin`, data, true);
    return res?.status === "success";
};

// delete voice 
export const deleteVoice = async (voiceId: string) => {
    let res = await deleteDoc(`/voices/${voiceId}`, true);
    return res?.status === "success"; 
}