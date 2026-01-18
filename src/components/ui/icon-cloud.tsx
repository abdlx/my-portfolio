"use client"
import React, { useEffect, useRef, useState } from "react"

interface Icon {
    x: number
    y: number
    z: number
    scale: number
    opacity: number
    id: number
}

interface IconCloudProps {
    iconSlugs?: string[]
}

function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3)
}

export function IconCloud({ iconSlugs }: IconCloudProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [iconPositions, setIconPositions] = useState<Icon[]>([])
    const [rotation, setRotation] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [targetRotation, setTargetRotation] = useState<{
        x: number
        y: number
        startX: number
        startY: number
        distance: number
        startTime: number
        duration: number
    } | null>(null)

    const animationFrameRef = useRef<number>(0)
    const rotationRef = useRef(rotation)
    const imagesRef = useRef<HTMLImageElement[]>([])
    const imagesLoadedRef = useRef<boolean[]>([])

    // Load icons from SimpleIcons CDN
    useEffect(() => {
        if (!iconSlugs) return

        imagesLoadedRef.current = new Array(iconSlugs.length).fill(false)
        const newImages = iconSlugs.map((slug, index) => {
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.src = `https://cdn.simpleicons.org/${slug}/white`
            img.onload = () => {
                imagesLoadedRef.current[index] = true
            }
            return img
        })
        imagesRef.current = newImages
    }, [iconSlugs])

    // Generate initial icon positions on a sphere
    useEffect(() => {
        const numIcons = iconSlugs?.length || 20
        const newIcons: Icon[] = []

        // Fibonacci sphere parameters
        const offset = 2 / numIcons
        const increment = Math.PI * (3 - Math.sqrt(5))

        for (let i = 0; i < numIcons; i++) {
            const y = i * offset - 1 + offset / 2
            const r = Math.sqrt(1 - y * y)
            const phi = i * increment
            const x = Math.cos(phi) * r
            const z = Math.sin(phi) * r

            newIcons.push({
                x: x * 150,
                y: y * 150,
                z: z * 150,
                scale: 1,
                opacity: 1,
                id: i,
            })
        }
        setIconPositions(newIcons)
    }, [iconSlugs])

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDragging(true)
        setLastMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current?.getBoundingClientRect()
        if (rect) {
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            setMousePos({ x, y })
        }
        if (isDragging) {
            const deltaX = e.clientX - lastMousePos.x
            const deltaY = e.clientY - lastMousePos.y
            rotationRef.current = {
                x: rotationRef.current.x + deltaY * 0.002,
                y: rotationRef.current.y + deltaX * 0.002,
            }
            setLastMousePos({ x: e.clientX, y: e.clientY })
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const centerX = canvas.width / 2
            const centerY = canvas.height / 2

            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
            const dx = mousePos.x - centerX
            const dy = mousePos.y - centerY
            const distance = Math.sqrt(dx * dx + dy * dy)
            const speed = 0.002 + (distance / maxDistance) * 0.008

            if (targetRotation) {
                const elapsed = performance.now() - targetRotation.startTime
                const progress = Math.min(1, elapsed / targetRotation.duration)
                const easedProgress = easeOutCubic(progress)
                rotationRef.current = {
                    x: targetRotation.startX + (targetRotation.x - targetRotation.startX) * easedProgress,
                    y: targetRotation.startY + (targetRotation.y - targetRotation.startY) * easedProgress,
                }
                if (progress >= 1) {
                    setTargetRotation(null)
                }
            } else if (!isDragging) {
                rotationRef.current = {
                    x: rotationRef.current.x + (dy / canvas.height) * speed,
                    y: rotationRef.current.y + (dx / canvas.width) * speed,
                }
            }

            // Sort by Z for proper layering
            const sortedIcons = [...iconPositions].sort((a, b) => {
                const zA = a.x * Math.sin(rotationRef.current.y) + a.z * Math.cos(rotationRef.current.y)
                const zB = b.x * Math.sin(rotationRef.current.y) + b.z * Math.cos(rotationRef.current.y)
                return zA - zB
            })

            iconPositions.forEach((icon, index) => {
                const cosX = Math.cos(rotationRef.current.x)
                const sinX = Math.sin(rotationRef.current.x)
                const cosY = Math.cos(rotationRef.current.y)
                const sinY = Math.sin(rotationRef.current.y)

                const rotatedX = icon.x * cosY - icon.z * sinY
                const rotatedZ = icon.x * sinY + icon.z * cosY
                const rotatedY = icon.y * cosX + rotatedZ * sinX

                const scale = (rotatedZ + 300) / 450
                const opacity = Math.max(0.1, Math.min(1, (rotatedZ + 200) / 300))

                ctx.save()
                ctx.translate(canvas.width / 2 + rotatedX, canvas.height / 2 + rotatedY)
                ctx.scale(scale, scale)
                ctx.globalAlpha = opacity

                if (imagesRef.current[index] && imagesLoadedRef.current[index]) {
                    ctx.drawImage(imagesRef.current[index], -20, -20, 40, 40)
                }

                ctx.restore()
            })
            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [iconSlugs, iconPositions, isDragging, mousePos, targetRotation])

    return (
        <canvas
            ref={canvasRef}
            width={500}
            height={500}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="mx-auto"
            aria-label="Interactive 3D Icon Cloud"
            role="img"
        />
    )
}
