"use client";

import { Canvas, useThree } from "@react-three/fiber";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import * as THREE from "three";

import {
  TRAVEL_REGIONS,
  type TravelRegionId,
} from "./spatial-data";

export interface InteractiveGlobeProps {
  selectedRegionId: TravelRegionId;
  onSelectRegion: (regionId: TravelRegionId) => void;
}

interface Rotation {
  x: number;
  y: number;
}

function latitudeLongitudeToPosition(
  latitude: number,
  longitude: number,
  radius = 1.43,
): [number, number, number] {
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = (longitude + 180) * (Math.PI / 180);

  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function GlobeScene({
  rotation,
  zoom,
  selectedRegionId,
  onSelectRegion,
}: InteractiveGlobeProps & {
  rotation: Rotation;
  zoom: number;
}) {
  const globeGroup = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  useEffect(() => {
    if (!globeGroup.current) {
      return;
    }

    globeGroup.current.rotation.set(rotation.x, rotation.y, 0);
    globeGroup.current.scale.setScalar(zoom);
    invalidate();
  }, [invalidate, rotation.x, rotation.y, zoom]);

  return (
    <>
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-3, -2, 2]} intensity={0.6} />

      <group ref={globeGroup}>
        <mesh>
          <sphereGeometry args={[1.35, 32, 32]} />
          <meshStandardMaterial
            color="#0B4B74"
            roughness={0.78}
            metalness={0.08}
          />
        </mesh>

        <mesh scale={1.006}>
          <sphereGeometry args={[1.35, 18, 18]} />
          <meshBasicMaterial
            color="#8FD3FF"
            opacity={0.22}
            transparent
            wireframe
          />
        </mesh>

        {TRAVEL_REGIONS.map((region) => {
          const isSelected = region.id === selectedRegionId;

          return (
            <mesh
              key={region.id}
              position={latitudeLongitudeToPosition(
                region.latitude,
                region.longitude,
              )}
              onClick={(event) => {
                event.stopPropagation();
                onSelectRegion(region.id);
              }}
              scale={isSelected ? 1.35 : 1}
            >
              <sphereGeometry args={[0.075, 14, 14]} />
              <meshStandardMaterial
                color={isSelected ? "#F59E0B" : "#F8FAFC"}
                emissive={isSelected ? "#F59E0B" : "#0B4B74"}
                emissiveIntensity={isSelected ? 0.8 : 0.25}
              />
            </mesh>
          );
        })}
      </group>
    </>
  );
}

export default function InteractiveGlobe({
  selectedRegionId,
  onSelectRegion,
}: InteractiveGlobeProps) {
  const [rotation, setRotation] = useState<Rotation>({
    x: 0.18,
    y: -0.55,
  });
  const [zoom, setZoom] = useState(1);

  const dragState = useRef({
    active: false,
    pointerId: -1,
    x: 0,
    y: 0,
  });

  const rotateGlobe = useCallback((deltaX: number, deltaY: number) => {
    setRotation((current) => ({
      x: Math.max(-1.1, Math.min(1.1, current.x + deltaY)),
      y: current.y + deltaX,
    }));
  }, []);

  const changeZoom = useCallback((amount: number) => {
    setZoom((current) =>
      Math.max(0.82, Math.min(1.22, current + amount)),
    );
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    dragState.current = {
      active: true,
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (
      !dragState.current.active ||
      dragState.current.pointerId !== event.pointerId
    ) {
      return;
    }

    const deltaX = event.clientX - dragState.current.x;
    const deltaY = event.clientY - dragState.current.y;

    dragState.current.x = event.clientX;
    dragState.current.y = event.clientY;

    rotateGlobe(deltaX * 0.008, deltaY * 0.008);
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (dragState.current.pointerId === event.pointerId) {
      dragState.current.active = false;
      dragState.current.pointerId = -1;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    const rotationStep = 0.12;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        rotateGlobe(-rotationStep, 0);
        break;
      case "ArrowRight":
        event.preventDefault();
        rotateGlobe(rotationStep, 0);
        break;
      case "ArrowUp":
        event.preventDefault();
        rotateGlobe(0, -rotationStep);
        break;
      case "ArrowDown":
        event.preventDefault();
        rotateGlobe(0, rotationStep);
        break;
      case "+":
      case "=":
        event.preventDefault();
        changeZoom(0.08);
        break;
      case "-":
      case "_":
        event.preventDefault();
        changeZoom(-0.08);
        break;
      case "Home":
        event.preventDefault();
        setRotation({ x: 0.18, y: -0.55 });
        setZoom(1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="rounded-3xl border border-slate-200 bg-slate-950/95 p-4 shadow-2xl dark:border-slate-700"
      role="group"
      aria-label="Interactive travel community globe"
      tabIndex={0}
      onKeyDown={handleKeyboard}
    >
      <div
        className="relative h-[330px] w-full cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing sm:h-[390px]"
        style={{ touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        <Canvas
          dpr={[1, 1.5]}
          frameloop="demand"
          camera={{ position: [0, 0, 4.35], fov: 42 }}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "low-power",
          }}
        >
          <GlobeScene
            rotation={rotation}
            zoom={zoom}
            selectedRegionId={selectedRegionId}
            onSelectRegion={onSelectRegion}
          />
        </Canvas>

        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            type="button"
            onClick={() => changeZoom(-0.08)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-lg font-semibold text-white backdrop-blur transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Zoom globe out"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => changeZoom(0.08)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-lg font-semibold text-white backdrop-blur transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Zoom globe in"
          >
            +
          </button>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-slate-300">
        Drag to rotate. Use arrow keys to rotate, +/− to zoom, and Home to
        reset.
      </p>
    </div>
  );
}
