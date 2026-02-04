"use client";

import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '@/utils/imageCrop'
import { Minus, Plus } from 'lucide-react'

interface ImageCropperProps {
  image: string
  onCropComplete: (croppedImage: Blob) => void
  onCancel: () => void
}

export default function ImageCropper({ image, onCropComplete, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop)
  }

  const onZoomChange = (zoom: number) => {
    setZoom(zoom)
  }

  const onCropAreaComplete = useCallback((_: any, clippedPixels: any) => {
    setCroppedAreaPixels(clippedPixels)
  }, [])

  const handleConfirm = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels)
      if (croppedImage) {
        onCropComplete(croppedImage)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="fixed inset-0 z-[99999] bg-black flex flex-col h-[100dvh] w-screen overflow-hidden">
      {/* Area de Recorte - Ocupa la parte superior */}
      <div className="relative h-[65vh] md:h-[70vh] bg-black">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={onCropChange}
          onCropComplete={onCropAreaComplete}
          onZoomChange={onZoomChange}
          classes={{
            containerClassName: "bg-black",
          }}
        />
      </div>

      {/* Controles Compactos - Directamente debajo de la foto */}
      <div className="flex-1 bg-[#0a0a0b] px-6 py-6 md:py-8 flex flex-col justify-start space-y-6 md:space-y-8 border-t border-white/5">
        
        {/* Los dos botones arriba para que estén pegados a la foto */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 rounded-xl bg-white/5 text-white font-bold active:bg-white/10 transition-all border border-white/10"
          >
            Eliminar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-4 rounded-xl bg-[#3a1b4e] text-white font-bold active:bg-[#2a1239] transition-all shadow-lg"
          >
            Guardar
          </button>
        </div>

        {/* Slider de Zoom debajo de los botones */}
        <div className="flex items-center gap-4 px-2">
          <button onClick={() => setZoom(Math.max(1, zoom - 0.2))} className="text-white/40 active:text-white p-2">
            <Minus size={20} />
          </button>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.01}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#5CD494]"
          />
          <button onClick={() => setZoom(Math.min(3, zoom + 0.2))} className="text-white/40 active:text-white p-2">
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
