"use client"; 

import React from 'react';
import Image from 'next/image';

import { ImagePlus, Trash, X } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
    disabled?: boolean; 
    onChange: (value: string) => void; 
    onRemove: (value: string) => void; 
    path?: string;
    images?: string[]; 
    avatar?: boolean; 
    external?: boolean; 
    text?: string; 
    className?: string; 
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled, onChange, onRemove, path, images, text, avatar = false, external = false, className
}) => {
    const [isMounted, setIsMounted] = React.useState(false); 

    React.useEffect(() => {setIsMounted(true)}, []); 

    const onUpload = (result: any) => {
        if (result.event === 'success') {
            onChange(result.info.secure_url); 
        }
    }

    if (!isMounted) return ''; 
    return (
        <div className={cn(avatar ? "my-4": "", className)}>
            {
                !external && (
                    <div className="mb-4 flex items-center gap-4">
                        {
                            images?.map((url: string, index: number) => (
                                <div key={index} className={`${avatar ? "w-[60px] h-[60px] rounded-full": "w-[200px] h-[100px] rounded-md overflow-hidden"} relative`}>
                                    <div className={avatar ? "absolute z-10 -right-2 -top-2": "z-10 absolute top-2 right-2"}>
                                        <Button 
                                            type="button" 
                                            onClick={() => onRemove(url)} 
                                            variant='destructive' size="icon"
                                            className={avatar ? "rounded-full w-6 h-6":""}
                                        >
                                            {avatar ? <X className="h-4 w-4" />: <Trash className='h-4 w-4'/>}
                                        </Button>
                                    </div>
                                    <Image 
                                        fill
                                        className={`${avatar ? "object-contain rounded-full": "object-cover"}`}
                                        alt='Image'
                                        src={url}
                                    
                                    />
                                </div>
                            ))
                        }
                    </div>
                )
            }
         
            <CldUploadWidget
                onSuccess={onUpload}
                uploadPreset='dicydanz'
                options={{
                    cropping: false,
                    folder: path || 'test'
                }}
            >
                {({ open }: {open: any}) => {
                    const onClick = (e: any) => {
                        open()
                    }
                    return (
                        <Button 
                            type={"button"}
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className='h-4 w-4 mr-2'/>
                            {text ? text: avatar ? "Change profile picture": "Upload an Image"}
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    );
}

export default ImageUpload;