"use client";

import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '@/utils/imageCrop'
import { X, Maximize2, Minus, Plus, RotateCcw, Trash2 } from 'lucide-react'

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
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-8 md:p-12">
      <div className="w-full max-w-4xl bg-[#121214] rounded-3xl shadow-2xl border border-white/5 overflow-hidden flex flex-col md:flex-row h-fit max-h-[90vh] md:h-[650px] animate-in fade-in zoom-in-95 duration-500">
        
        {/* Editor Canvas Area */}
        <div className="flex-1 bg-black/40 relative overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            <span className="text-[10px] font-medium text-white/70 uppercase tracking-widest">Vista Previa</span>
          </div>
          
          <div className="w-full h-full relative cursor-move">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={onCropChange}
              onCropComplete={onCropAreaComplete}
              onZoomChange={onZoomChange}
              classes={{
                containerClassName: "bg-transparent",
                mediaClassName: "max-w-none",
              }}
            />
          </div>
        </div>

        {/* Pro Control Panel */}
        <div className="w-full md:w-[380px] bg-[#121214] flex flex-col">
          {/* Panel Header */}
          <div className="p-8 pb-4 flex flex-col items-center text-center relative">
            <button 
              onClick={onCancel} 
              className="absolute right-6 top-8 p-2 hover:bg-white/5 rounded-full text-white/40 transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold text-white tracking-tight">Editar Imagen</h3>
            <p className="text-xs text-white/40 mt-1">Ajusta el encuadre y escala</p>
          </div>

          <div className="flex-1 p-8 pt-6 space-y-10 overflow-y-auto">
            {/* Zoom Controls */}
            <div className="space-y-6">
              <div className="flex justify-between items-center text-white/60">
                <span className="text-xs font-medium">Escala</span>
                <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded-md">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  type="button"
                  onClick={() => setZoom(Math.max(1, zoom - 0.1))}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/60 transition-all border border-white/5"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-1 relative flex items-center">
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.01}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#5CD494]"
                  />
                </div>
                <button 
                  type="button"
                  onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/60 transition-all border border-white/5"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Quick Presets / Tools */}
            <div className="space-y-4">
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em]">Herramientas</span>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button" 
                  className="flex items-center justify-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 group"
                >
                  <RotateCcw size={18} className="text-white/40 group-hover:text-white" />
                  <span className="text-xs font-medium text-white/40 group-hover:text-white">Rotar</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => { setZoom(1); setCrop({ x: 0, y: 0 }); }} 
                  className="flex items-center justify-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 group"
                >
                  <Trash2 size={18} className="text-white/40 group-hover:text-red-400" />
                  <span className="text-xs font-medium text-white/40 group-hover:text-white">Reset</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
              <p className="text-[11px] leading-relaxed text-white/40 text-center">
                Arrastra la imagen para centrarla dentro del marco de corte.
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-8 pt-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full py-4 px-6 rounded-2xl bg-[#5CD494] text-[#0a0a0b] text-sm font-semibold hover:bg-[#4bc081] transition-all shadow-lg shadow-emerald-500/10 active:scale-[0.98]"
            >
              Aplicar Cambios
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-4 px-6 rounded-2xl text-white/40 text-sm font-medium hover:text-white transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
