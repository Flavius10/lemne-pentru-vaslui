"use client";

import Image from "next/image";
import './globals.css';
import { useState, useEffect } from "react";
import { getProgress } from "@/actions/database";

export default function Home() {
  const handleCopy = () => {
    navigator.clipboard.writeText('RO08BTRLRONCRT0668242601')
      .then(() => {
        alert('Cont RON copiat!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const targetAmount = 30000;
  const calculatePercentage = (sum) => {
    return sum ? (sum / targetAmount) * 100 : 0; // Handle undefined/null sum values
  };

  const [progressValue, setProgressValue] = useState(0); // Set initial state to 0 to avoid undefined

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressStatus = await getProgress();
        console.log(progressStatus);
        if (typeof progressStatus === 'number') {
          setProgressValue(progressStatus);
        } else {
          console.warn('Received unexpected progressStatus value:', progressStatus);
          setProgressValue(0); // Fallback value
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
        setProgressValue(0); // Handle errors gracefully by setting a default value
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-center p-4 bg-[#fff7f1] min-h-screen">
      <h1 className="text-5xl font-BerkshireSwash text-[#216778] mb-6">Tabără educațională 70 de copii Vaslui</h1>
      <p className="text-3xl font-BerkshireSwash text-[#693b23] mb-4">
          Termen limită: 10 Iulie
        </p>
      <Image src="/camion.png" alt="Lemne pentru Vaslui" width={200} height={200} className="mb-6" />

      <p className="text-xl text-[#693b23] mb-4"> <b>{progressValue} lei</b> strânși din 30.000 lei</p>

      <progress value={calculatePercentage(progressValue)} max="100" className="w-full max-w-lg h-6 mb-6 bg-gray-200"></progress>

      <button 
        className="bg-[#b94d14] bg-[#f8bd77] text-[#b94d14] text-xl font-BerkshireSwash py-3 px-6 rounded-[30px] hover:bg-[#c57e3c] mb-6"
        onClick={handleCopy}
      >
        Donează acum!
      </button>
      <p className="text-sm text-[#693b23] mb-4">*progress bar-ul este actualizat aprox. o dată la 15 min</p>

      <div className="text-left text-[#693b23] md:mx-[25%]">
        {/* <p className="text-xl font-BerkshireSwash text-[#693b23] mb-4">
        Asociatia Speranța Fără Frontiere
        </p> */}
        <b>
        <h2 className="text-base text-[#693b23]">Cont RON</h2>
        <p className="text-base text-[#693b23] mb-4">RO08BTRLRONCRT0668242601</p>

        <h2 className="text-base text-[#693b23]">Cont EUR</h2>
        <p className="text-base text-[#693b23] mb-4">RO55BTRLEURCRT0668242601</p>

        <h2 className="text-base text-[#693b23]">Cont USD</h2>
        <p className="text-base text-[#693b23] mb-4">RO59BTRLUSDCRT0668242601</p>

        <p className="text-base text-[#693b23] mb-4">
          Vă rugăm să menționați în transfer &quot;Tabără Voroneț&quot; pentru a fi direcționați către această cauză. Vă mulțumim!
        </p>

        <p className="text-base text-[#693b23]">Pentru donații cash:</p>
        <p className="text-base text-[#693b23]">0723 999 950 - Dumitru Hrișca</p></b>
      </div>
    </div>
  );
}
