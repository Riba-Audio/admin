// app version 
"use client"
import UpdateModal from "@/components/modals/update-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { Heading2 } from "@/components/ui/typography"
import { useCustomEffect } from "@/hooks/useEffect";
import useMounted from "@/hooks/useMounted";
import { getAppVersion } from "@/lib/api-calls/update";
import React from "react"


const AppVersion = () => {
    const [appVersion, setAppVersion] = React.useState<string>("2.0.0");
    const [loading, setLoading] = React.useState<boolean>(true); 
    const [showAppVersionModal, setShowAppVersionModal] = React.useState<boolean>(false); 

    const mounted = useMounted(); 

    const fetchAppVersion = async () => {
        let res = await getAppVersion();
        if (res) {
            setAppVersion(res.version)
        }
        setLoading(false)
    };

    useCustomEffect(fetchAppVersion, []);

    if (loading || !mounted) return <Skeleton className="w-full h-[20vh]"/>


    return (
        <>
            <UpdateModal 
                isOpen={showAppVersionModal}
                onClose={() => setShowAppVersionModal(false)}
                setVersion={setAppVersion}
            />
            <Card className="mb-4 lg:mt-0 mt-4 p-5">
                <Heading2 className="text-md lg:text-lg">Current app version: {appVersion}</Heading2>
                <Button className="w-full my-3" onClick={() => setShowAppVersionModal(true)}>Update</Button>
            </Card>
        </>
    )
};

export default AppVersion; 