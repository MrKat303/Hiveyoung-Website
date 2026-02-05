"use client";

import React, { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '@/app/(app)/_utils/imageCrop'
import styles from './ImageCropper.module.css'

interface ImageCropperProps {
  image: string
  onCropComplete: (croppedImage: Blob) => void
  onCancel: () => void
}

export default function ImageCropper({ image, onCropComplete, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number, y: number, width: number, height: number } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Prevent body scroll when cropper is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop)
  }

  const onZoomChange = (zoom: number) => {
    setZoom(zoom)
  }

  const onRotationChange = (rotation: number) => {
    setRotation(rotation)
  }

  const onCropAreaComplete = useCallback((_: unknown, clippedPixels: { x: number, y: number, width: number, height: number }) => {
    setCroppedAreaPixels(clippedPixels)
  }, [])

  const handleConfirm = async () => {
    try {
      if (!croppedAreaPixels || isProcessing) return;
      setIsProcessing(true)
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation)
      if (croppedImage) {
        onCropComplete(croppedImage)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!mounted) return null

  return createPortal(
    <div className={styles.cropper_container} style={{ backgroundColor: 'white' }}>
      <div className={styles.cropper_card}>
        {/* Header */}
        <header className={styles.cropper_header}>
          <button type="button" onClick={onCancel} className={styles.undo_btn}>
            Deshacer
          </button>
          <h1 className={styles.header_title}>Editar foto</h1>
          <div style={{ width: 80 }} /> {/* Spacer */}
        </header>

        {/* Crop Area - FORCED HEIGHT INLINE */}
        <div 
          className={styles.cropper_area_wrapper} 
          style={{ 
            height: '340px', 
            minHeight: '340px', 
            position: 'relative', 
            backgroundColor: '#000',
            width: '100%',
            overflow: 'hidden',
            display: 'block'
          }}
        >
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape="round"
            showGrid={true}
            onCropChange={onCropChange}
            onCropComplete={onCropAreaComplete}
            onZoomChange={onZoomChange}
            onRotationChange={onRotationChange}
            classes={{
              containerClassName: styles.container_class,
              cropAreaClassName: styles.crop_area_class,
            }}
          />
        </div>

        {/* Controls */}
        <section className={styles.controls_wrapper}>
          {/* Straighten Control */}
          <div className={styles.slider_group}>
            <div className={styles.slider_labels}>
              <span className={styles.slider_name}>ROTACIÓN</span>
              <span className={styles.slider_value}>{rotation}°</span>
            </div>
            <div className={styles.slider_container}>
              <div className={styles.slider_track_center}></div>
              <input
                type="range"
                value={rotation}
                min={-45}
                max={45}
                step={1}
                onChange={(e) => onRotationChange(Number(e.target.value))}
                className={styles.custom_slider}
              />
            </div>
          </div>

          {/* Zoom Control */}
          <div className={styles.slider_group} style={{ marginTop: '-10px', opacity: 0.8 }}>
            <div className={styles.slider_labels}>
              <span className={styles.slider_name}>ZOOM</span>
              <span className={styles.slider_value}>{Math.round(zoom * 100)}%</span>
            </div>
            <div className={styles.slider_container}>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.01}
                onChange={(e) => onZoomChange(Number(e.target.value))}
                className={styles.custom_slider}
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleConfirm}
            className={styles.save_btn}
          >
            {isProcessing ? "Procesando..." : "Guardar foto"}
          </button>
        </section>
      </div>
    </div>,
    document.body
  )
}

