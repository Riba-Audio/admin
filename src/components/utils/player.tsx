 
import { Card } from "../ui/card"
import { Heading5 } from '../ui/typography';
import AppImage from '../common/app-image';
import { images } from '@/assets';
import {   X } from 'lucide-react';
import React from 'react';
import useMounted from '@/hooks/useMounted';
import { Separator } from '../ui/separator';
import { usePlayerState } from '@/store/player';


const Player = () => {
    const audioRef = React.useRef<any>();
    const [playing, setPlaying] = React.useState<boolean>(false); 
    const {track, clearPlayer} = usePlayerState(); 


    const handlePlayPause = () => {
        if (audioRef.current?.paused) {
            setPlaying(true)
            audioRef.current?.play();
        } else {
            setPlaying(false)
            audioRef.current?.pause();
        }
    };
    return (
        <>  
            {
                track && (
                    <Card className="mr-5 p-2 mb-[7.5rem] fixed bottom-0 right-0  bg-background flex gap-2 items-center w-[400px]">
                        <div className='w-[83px] h-[83px] relative overflow-hidden'>
                            <AppImage 
                                src={track.banner || images.placeholder_img}
                                alt="Player"
                                title="Player"
                                fill
                                objectFit='cover'
                            />
                        </div>
                        <div className='flex-1'>
                            <div className="flex justify-between items-center my-1">
                                <Heading5 className='font-bold text-xs lg:text-xs max-w-[80%] overflow-auto'>Currently playing: {track.title}</Heading5>
                                <span 
                                    className='cursor-pointer duration-700 hover:text-destructive'
                                    onClick={() => {
                                        // console.log(this?.rap?.audioEl)
                                        setPlaying(false)
                                        audioRef.current?.pause();
                                        clearPlayer()
                                    }}
                                >
                                    <X size={18}/>
                                </span>
                            </div>
                            <audio ref={audioRef} src={track.src} preload="metadata" controls={false}>
                                <p>Your browser does not support the <code>audio</code> element.</p>
                            </audio>
                            <div className='flex flex-col items-start gap-1'>
                                <ProgressBar audioRef={audioRef} setPlaying={setPlaying}/>
                                <Separator className='my-0'/>
                                <span 
                                    onClick={handlePlayPause} 
                                    className='text-xs border hover:border-secondary-color px-5 px-1 rounded-full font-bold block cursor-pointer duration-700 hover:text-secondary-color' 
                                >
                                    {!playing ?  "Play" : "Pause" }
                                </span>

                            </div>
                            
                        </div>
                    </Card>
                )
            }
        </>
    )
};

export default Player; 


const ProgressBar = ({audioRef, setPlaying}: {audioRef: any, setPlaying: React.Dispatch<boolean>}) => {
    const [currentTime, setCurrentTime] = React.useState(0); // State to store current time
    const [duration, setDuration] = React.useState(0); // State to store audio duration
    const mounted = useMounted(); 

    // Update the current time as the audio plays
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
        if (audioRef.current.currentTime === audioRef.current.duration) {
            setCurrentTime(0); 
            setPlaying(false)
        }
    };

    // Set duration when the audio metadata is loaded
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Handle user interaction with the progress bar
    const handleProgressBarClick = (e: any) => {
        const progressBar = e.target;
        const clickPosition = e.nativeEvent.offsetX;
        const newTime = (clickPosition / progressBar.offsetWidth) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    React.useEffect(() => {
        if (!mounted) return; 
        if (audioRef.current) {
             
            // Add event listeners for time update and metadata load
            audioRef.current?.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current?.addEventListener('loadedmetadata', handleLoadedMetadata);

            return () => {
                // Cleanup event listeners on unmount
                audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, [duration, mounted]);

    // Convert currentTime to percentage
    const progressPercentage = (currentTime / duration) * 100 || 0;
    return (
        <div className='flex-1 w-full flex items-center gap-2'>
            {/* Progress Bar */}
            <span className='text-[.55rem] lg:text-[.55rem]'>{formatTime(currentTime)}s</span>
            <div
                className="w-full h-1 bg-gray-300 rounded cursor-pointer"
                onClick={handleProgressBarClick} // Handle click to jump to a specific time
                style={{ position: 'relative' }}
            >
                <div
                    className="h-full bg-green-500 rounded"
                    style={{
                        width: `${progressPercentage}%`, // Set the progress width based on the current time
                        transition: 'width 0.1s ease',
                    }}
                ></div>
            </div>
            <span className='text-[.55rem] lg:text-[.55rem]'>{formatTime(duration)}s</span>
        </div>
    )
}

// Helper function to format time (in seconds) to HH:mm:ss or mm:ss
const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    // Format the time based on whether it's more than an hour
    return hours > 0
        ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        : `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
