'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AudioWaveProps {
  audioUrl: string;
  height?: number;
  barWidth?: number;
  barGap?: number;
  barColor?: string;
  backgroundColor?: string;
}

export const AudioWave: React.FC<AudioWaveProps> = ({
  audioUrl,
  height = 100,
  barWidth = 3,
  barGap = 1,
  barColor = 'url(#gradient)',
  backgroundColor = 'transparent',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioData, setAudioData] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        // Get audio data
        const channelData = audioBuffer.getChannelData(0);
        const samples = 100; // Number of bars to display
        const blockSize = Math.floor(channelData.length / samples);
        const filteredData = [];
        
        for (let i = 0; i < samples; i++) {
          const blockStart = blockSize * i;
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(channelData[blockStart + j]);
          }
          filteredData.push(sum / blockSize);
        }

        // Normalize the data
        const multiplier = Math.pow(Math.max(...filteredData), -1);
        const normalizedData = filteredData.map(n => n * multiplier);
        
        setAudioData(normalizedData);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadAudio();
  }, [audioUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx || !audioData.length) return;

    const dpr = window.devicePixelRatio || 1;
    const padding = 20;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = height * dpr;
    
    // Scale context for retina displays
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'hsl(var(--primary))');
    gradient.addColorStop(1, 'hsl(var(--secondary))');
    
    // Draw waveform
    const barCount = audioData.length;
    const width = canvas.offsetWidth - padding * 2;
    const barSpace = width / barCount;
    
    audioData.forEach((value, index) => {
      const x = padding + index * barSpace;
      const barHeight = value * (height - padding * 2);
      
      // Draw bar
      ctx.fillStyle = gradient;
      ctx.fillRect(
        x,
        (height - barHeight) / 2,
        barWidth,
        barHeight
      );
    });
  }, [audioData, height, barWidth, barGap]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime / audio.duration);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  return (
    <div className="relative w-full">
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          onClick={togglePlayPause}
          className="w-full cursor-pointer"
          style={{ height: `${height}px` }}
        />
        
        {/* Playback Progress Overlay */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary/10"
          style={{ width: `${currentTime * 100}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${currentTime * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
};