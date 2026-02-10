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
    const rotationRef = useRef({ x: 0, y: 0 })
    const mousePosRef = useRef({ x: 0, y: 0 })
    const lastMousePosRef = useRef({ x: 0, y: 0 })
    const isDraggingRef = useRef(false)
    const isVisibleRef = useRef(false)
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
        isDraggingRef.current = true
        lastMousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current?.getBoundingClientRect()
        if (rect) {
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            mousePosRef.current = { x, y }
        }
        if (isDraggingRef.current) {
            const deltaX = e.clientX - lastMousePosRef.current.x
            const deltaY = e.clientY - lastMousePosRef.current.y
            rotationRef.current = {
                x: rotationRef.current.x + deltaY * 0.002,
                y: rotationRef.current.y + deltaX * 0.002,
            }
            lastMousePosRef.current = { x: e.clientX, y: e.clientY }
        }
    }

    const handleMouseUp = () => {
        isDraggingRef.current = false
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting
            },
            { threshold: 0.1 }
        )

        if (canvasRef.current) {
            observer.observe(canvasRef.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const animate = () => {
            if (!isVisibleRef.current) {
                animationFrameRef.current = requestAnimationFrame(animate)
                return
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const centerX = canvas.width / 2
            const centerY = canvas.height / 2

            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
            const dx = mousePosRef.current.x - centerX
            const dy = mousePosRef.current.y - centerY
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
            } else if (!isDraggingRef.current) {
                rotationRef.current = {
                    x: rotationRef.current.x + (dy / canvas.height) * speed,
                    y: rotationRef.current.y + (dx / canvas.width) * speed,
                }
            }

            // Using the current rotation values for calculating rotated positions
            const cosX = Math.cos(rotationRef.current.x)
            const sinX = Math.sin(rotationRef.current.x)
            const cosY = Math.cos(rotationRef.current.y)
            const sinY = Math.sin(rotationRef.current.y)

            // Sort by projected Z for proper layering if needed, 
            // but for simple icon cloud we can just iterate.
            // Optimization: Map once to calculate projected values
            const projected = iconPositions.map((icon, index) => {
                const rotatedX = icon.x * cosY - icon.z * sinY
                const rotatedZ = icon.x * sinY + icon.z * cosY
                const rotatedY = icon.y * cosX + rotatedZ * sinX

                const scale = (rotatedZ + 300) / 450
                const opacity = Math.max(0.1, Math.min(1, (rotatedZ + 200) / 300))

                return {
                    x: rotatedX,
                    y: rotatedY,
                    z: rotatedZ,
                    scale,
                    opacity,
                    index
                }
            }).sort((a, b) => a.z - b.z);

            projected.forEach((p) => {
                ctx.save()
                ctx.translate(canvas.width / 2 + p.x, canvas.height / 2 + p.y)
                ctx.scale(p.scale, p.scale)
                ctx.globalAlpha = p.opacity

                if (imagesRef.current[p.index] && imagesLoadedRef.current[p.index]) {
                    ctx.drawImage(imagesRef.current[p.index], -20, -20, 40, 40)
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
    }, [iconSlugs, iconPositions, targetRotation])

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

