import '../App.css';
import { useEffect, useState } from 'react';
import cameleon from '../assets/cameleon.webp';
import baobab from '../assets/baobab.webp';
import julien from '../assets/julien.webp';
import flower from '../assets/Flower.webp';

function SplashScreen() {
    const images = [julien, cameleon, baobab, flower];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [hrWidth, setHrWidth] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 700);

        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        const element = document.querySelector('.image-container');
        if (element) {
            element.classList.add('scale-50');
            setTimeout(() => {
                element.classList.remove('scale-50');
                element.classList.add('scale-100');
            }, 300);
        }

        const hrAnimation = setInterval(() => {
            setHrWidth((prevWidth) => (prevWidth < 100 ? prevWidth + 5 : 100));
        }, 95);

        return () => clearInterval(hrAnimation);
    }, []);

    return (
        <div className='bg-white w-screen h-screen flex flex-col items-center justify-center'>
            <div className="absolute top-[50%] w-full z-20">
                <hr className='opacity-80 border-1 border-gray-400' />
                <hr
                    className='border-1 border-black/60 transition-all duration-700 ease-in-out'
                    style={{ width: `${hrWidth}%` }}
                />
            </div>
            <div className='image-container w-[370px] h-[240px] rounded-lg bg-white/30 z-10'>
                <img
                    src={images[currentImageIndex]}
                    alt="Changing"
                    className='w-full h-full rounded-lg object-cover'
                />
            </div>
            <div className='flex absolute w-screen flex-row items-center justify-between px-10 bottom-4 md:bottom-10'>
                <span className='text-black text-[1.5rem] xl:text-[2rem] font-medium'>Library's PWA</span>
                <div
                    className="inline-block size-6 animate-spin rounded-full border-2 border-solid border-black border-e-black/40 align-[-0.125em] text-surface motion-reduce:animate-[spin_0.1s_linear_infinite]"
                    role="status">
                </div>
            </div>
        </div>
    );
}

export default SplashScreen;
