export type ComputerStatusType = "idle" | "processing" | "down" | "terminated"; 

export type BookProcessingType = {
    title: string; 
    section: string; 
    id: string; 
}
export type ComputerInfoType = {
    storage: string;
    ram: number; 
    gpu: string; 
    processor: string; 
}

export type ComputerType = {
    id: string; 
    status: ComputerStatusType 
    title: string; 
    email: string;
    info: ComputerInfoType;
    ngrok: string; 
    book?: BookProcessingType; 
}