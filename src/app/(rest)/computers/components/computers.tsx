"use client";

import Container from "@/components/utils/container";
import React from "react";
import Computer, { ComputerSkeleton } from "./computer";
import { createArray } from "@/utils/format-numbers";
import { Card } from "@/components/ui/card";
import { Heading4 } from "@/components/ui/typography";
import AddButton from "@/components/utils/add";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ComputerType } from "@/types";
import AddComputerModal from "@/components/modals/add-computer";
import { getComputers } from "@/lib/api-calls/computers";
import useMounted from "@/hooks/useMounted";
import { useCustomEffect } from "@/hooks/useEffect";

const Computers = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [computers, setComputers] = React.useState<ComputerType[]>([]);

    const [showAddModal, setShowAddModal] = React.useState<boolean>(false);
    const mounted = useMounted();

    const fetchComputers = async () => {
        if (!mounted) return;
        setLoading(true);
        let res = await getComputers();
        if (res) {
            setComputers(res);

        };
        setLoading(false)
    }
    useCustomEffect(fetchComputers, [mounted])
    return (
        <>

            <Container
                title="Computers"
                subtitle={`Total - ${computers.length} computers`}
                headerComponent={
                    <AddButton>
                        <Button
                            className="my-3 rounded-full items-center gap-4"
                            onClick={() => setShowAddModal(true)}
                        >
                            <Plus size={18} />
                            <span>Add Computer</span>
                        </Button>
                    </AddButton>
                }
            >
                <AddComputerModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    computers={computers}
                    setComputers={setComputers}

                />
                {
                    loading && (
                        <div className="grid grid-cols-4 gap-2">
                            {
                                createArray(30).map(itm => (
                                    <ComputerSkeleton key={itm} />
                                ))
                            }
                        </div>
                    )
                }
                {
                    !loading && !computers.length ? (
                        <Card className="flex items-center justify-center w-full h-[80vh]">
                            <Heading4>There are no machines stored!</Heading4>
                        </Card>
                    ) : <></>
                }
                {
                    !loading && computers.length ? (
                        <div className="grid grid-cols-4 gap-2">
                            {
                                computers.map((comp, index) => (
                                    <Computer key={index} {...comp} />
                                ))
                            }
                        </div>
                    ) : <></>
                }
            </Container>
        </>
    )
};

export default Computers; 