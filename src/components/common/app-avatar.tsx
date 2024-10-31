import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface AvatarProps {
    name: string; 
    src: string; 
    dimension?: string; 
}

// generating placeholder
export const getPlaceHolder = (name: string) => {
    let arr = name?.split(" "); 

    let placeholder = ''; 
    if (arr.length >= 2) placeholder = `${arr[0].charAt(0).toUpperCase()}${arr[0].charAt(1).toUpperCase()}`
    if (arr.length === 1) placeholder = `${arr[0].charAt(0).toUpperCase()}${arr[0].charAt(1).toUpperCase()}`

    return placeholder; 
}

const AppAvatar: React.FC<AvatarProps> = ({name, src, dimension}) => (
    <Avatar className={dimension ? dimension: "w-8 h-8"}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-sm">{getPlaceHolder(name)}</AvatarFallback>
    </Avatar>

);

export default AppAvatar; 