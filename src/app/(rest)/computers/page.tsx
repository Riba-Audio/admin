"use client"; 

import Container from "@/components/utils/container";
import React from "react";
import Computer, { ComputerSkeleton, ComputerType } from "./components/computer";
import { createArray } from "@/utils/format-numbers";
import { Card } from "@/components/ui/card";
import { Heading2 } from "@/components/ui/typography";
import AddButton from "@/components/utils/add";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export default function Page() {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [computers, setComputers] = React.useState<ComputerType[]>([...dummy_computers]); 
    const [count, setCount] = React.useState<number>(1); 


    return (
        <Container 
            title="Computers" 
            subtitle={`Total - ${count}`}
            headerComponent={
                <AddButton>
                    <Button className="my-3 rounded-full items-center gap-4">
                        <Plus size={18}/>
                        <span>Add Computer</span>
                    </Button>
                </AddButton>
            }
        >
            {
                loading && (
                    <div className="grid grid-cols-4 gap-2">
                        {
                            createArray(30).map(itm => (
                                <ComputerSkeleton key={itm}/>
                            ))
                        }
                    </div>
                )
            }
            {
                !loading && !count ? (
                    <Card className="flex items-center justify-center w-full h-[80vh]">
                        <Heading2>There are no machines stored!</Heading2>
                    </Card>
                ): <></>
            }
            {
                !loading && count ? (
                    <div className="grid grid-cols-4 gap-2">
                        {
                            computers.map((comp, index) => (
                                <Computer key={index} {...comp}/>
                            ))
                        }
                    </div>
                ): <></>
            }
        </Container>
    )
}

// dummy data

const dummy_computers: ComputerType[] = [
    {
        id: "comp-001",
        status: "idle",
        title: "Office PC",
        info: {
            storage: "1TB SSD",
            ram: 16,
            gpu: "NVIDIA GTX 1660",
            processor: "Intel i7-9700"
        },
        ngrok: "https://ngrok.io/comp-001"
    },
    {
        id: "comp-002",
        status: "processing",
        title: "Rendering Workstation",
        info: {
            storage: "2TB HDD + 512GB SSD",
            ram: 32,
            gpu: "NVIDIA RTX 3080",
            processor: "AMD Ryzen 9 5900X"
        },
        ngrok: "https://ngrok.io/comp-002"
    },
    {
        id: "comp-003",
        status: "down",
        title: "Gaming Rig",
        info: {
            storage: "1TB NVMe SSD",
            ram: 16,
            gpu: "NVIDIA RTX 3070",
            processor: "Intel i5-11600K"
        },
        ngrok: "https://ngrok.io/comp-003"
    },
    {
        id: "comp-004",
        status: "terminated",
        title: "Development Laptop",
        info: {
            storage: "512GB SSD",
            ram: 8,
            gpu: "Integrated",
            processor: "Intel i5-1035G1"
        },
        ngrok: "https://ngrok.io/comp-004"
    },
    {
        id: "comp-005",
        status: "idle",
        title: "Server",
        info: {
            storage: "4TB RAID",
            ram: 64,
            gpu: "NVIDIA A40",
            processor: "AMD EPYC 7302"
        },
        ngrok: "https://ngrok.io/comp-005"
    },
    {
        id: "comp-006",
        status: "processing",
        title: "Data Analysis Workstation",
        info: {
            storage: "1TB SSD",
            ram: 64,
            gpu: "NVIDIA Tesla T4",
            processor: "Intel i9-10900K"
        },
        ngrok: "https://ngrok.io/comp-006"
    },
    {
        id: "comp-007",
        status: "down",
        title: "Old Laptop",
        info: {
            storage: "256GB SSD",
            ram: 4,
            gpu: "Integrated",
            processor: "Intel i3-7100U"
        },
        ngrok: "https://ngrok.io/comp-007"
    },
    {
        id: "comp-008",
        status: "terminated",
        title: "Virtual Machine",
        info: {
            storage: "100GB",
            ram: 8,
            gpu: "None",
            processor: "Virtual CPU"
        },
        ngrok: "https://ngrok.io/comp-008"
    },
    {
        id: "comp-009",
        status: "idle",
        title: "Home Theater PC",
        info: {
            storage: "1TB HDD",
            ram: 8,
            gpu: "NVIDIA GTX 1050",
            processor: "AMD Ryzen 5 3400G"
        },
        ngrok: "https://ngrok.io/comp-009"
    },
    {
        id: "comp-010",
        status: "processing",
        title: "AI Model Training Rig",
        info: {
            storage: "2TB SSD",
            ram: 128,
            gpu: "NVIDIA RTX 3090",
            processor: "AMD Ryzen Threadripper 3970X"
        },
        ngrok: "https://ngrok.io/comp-010"
    }
];
