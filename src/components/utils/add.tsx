import { PropsWithChildren } from "react"


const AddButton: React.FC<PropsWithChildren & {}> = ({ children }) => (
    <div className="flex justify-end gap-2 items-center" >
        {children}
    </div>
);

export default AddButton; 