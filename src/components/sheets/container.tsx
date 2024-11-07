
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet';

const SheetContainer = ({title, trigger, children, width}: {title: string, trigger: React.ReactNode, children: React.ReactNode, width?: string}) => {

    return (
        <Sheet>
            <SheetTrigger className='mr-2 max-sm:mr-0'>
                {trigger}
            </SheetTrigger>
            <SheetTitle className='hidden'>
                {title}
            </SheetTitle>
            <SheetDescription className='hidden'/>
            <SheetContent className={`${width && width} h-full flex flex-col`}>
                {children}
            </SheetContent>
        </Sheet>
    )
}; 


export default SheetContainer; 