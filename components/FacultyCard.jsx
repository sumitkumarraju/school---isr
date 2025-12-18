"use client";
import React, { useRef, useState } from 'react';

export default function FacultyCard({ name, role, image, className = "", imageClassName = "h-60" }) {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div
            className={`perspective-1000 h-full w-full ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={cardRef}
                className="relative h-full w-full rounded-xl p-6 border border-black/[0.1] bg-white hover:shadow-2xl transition-all duration-200 ease-linear shadow-md flex flex-col"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d'
                }}
            >
                <div style={{ transform: 'translateZ(50px)' }}>
                    <h3 className="text-xl font-bold text-iis-maroon font-serif">{name}</h3>
                    <p className="text-slate-500 text-sm max-w-sm mt-2 font-medium uppercase tracking-wider">{role}</p>
                </div>
                <div className="w-full mt-6" style={{ transform: 'translateZ(60px)' }}>
                    {/* Using standard img tag for simplicity with local files in public folder */}
                    <img
                        src={image}
                        className={`w-full object-cover rounded-xl shadow-lg pointer-events-none ${imageClassName}`}
                        alt={name}
                    />
                </div>
            </div>
        </div>
    );
}
