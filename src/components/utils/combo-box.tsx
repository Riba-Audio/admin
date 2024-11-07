"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; 
import {ScrollArea} from "@/components/ui/scroll-area"

export type ComboType = {
  value: string, label: string
}

interface ComboboxProps {
  title: string; 
  values: ComboType[]; 
  value: string | undefined; 
  setValue: React.Dispatch<string>;
  width?: string; 
  height?: string; 
}

const Combobox: React.FC<ComboboxProps> = ({title, values, value, setValue, width, height}) => {
  const [open, setOpen] = React.useState(false);
  
  const handleToLowerCase = (val: string) => val.toLowerCase(); 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(width ? width: "w-[200px]", "justify-between bg-transparent border border-secondary")}
        >
          {value
            ? values.find((item) => handleToLowerCase(item.value) === handleToLowerCase(value))?.label
            : `Select ${title}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(width ? width: "w-[200px]", "p-0")}>
        <Command className="bg-transparent w-full">
          <CommandInput placeholder={`Search ${title}...`} className="bg-transparent"/>
          <CommandEmpty>Nothing found.</CommandEmpty>
          <ScrollArea className={cn(height ? height: "", " w-full")}>
            <CommandGroup className="w-full">
              {values?.map((item) => (
                <CommandItem
                  key={item.value}
                  className="w-full"
                  value={item.value}
                  onSelect={(currentValue: string) => {
                    setValue(handleToLowerCase(currentValue) === handleToLowerCase(value || "") ? "" : handleToLowerCase(currentValue))
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      handleToLowerCase(value || "") === handleToLowerCase(item.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>

          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default Combobox; 
