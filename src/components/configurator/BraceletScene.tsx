"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export type SlotValue = { hex: string; name: string } | null;

const BAND_RADIUS = 1.5;

function MetalBand({ metal }: { metal: "gold" | "silver" }) {
  const color = metal === "gold" ? "#D9B65B" : "#C7CCD3";
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[BAND_RADIUS, 0.06, 32, 120]} />
      <meshStandardMaterial color={color} metalness={0.85} roughness={0.28} />
    </mesh>
  );
}

function StoneBead({
  position,
  hex,
  selected,
  onClick,
}: {
  position: [number, number, number];
  hex: string;
  selected: boolean;
  onClick: () => void;
}) {
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!ref.current) return;
    const target = hovered || selected ? 1.25 : 1;
    const current = ref.current.scale.x;
    ref.current.scale.setScalar(current + (target - current) * 0.15);
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.17, 32, 32]} />
      <meshStandardMaterial
        color={hex}
        metalness={0.15}
        roughness={0.25}
        emissive={selected ? hex : "#000000"}
        emissiveIntensity={selected ? 0.45 : 0}
      />
    </mesh>
  );
}

function EmptySlotMarker({
  position,
  onClick,
}: {
  position: [number, number, number];
  onClick: () => void;
}) {
  return (
    <mesh
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <torusGeometry args={[0.17, 0.018, 16, 32]} />
      <meshStandardMaterial color="#B9A17E" transparent opacity={0.5} />
    </mesh>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<import("three").Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });
  return <group ref={group}>{children}</group>;
}

export default function BraceletScene({
  slots,
  metal,
  activeSlot,
  onSelectSlot,
}: {
  slots: SlotValue[];
  metal: "gold" | "silver";
  activeSlot: number;
  onSelectSlot: (i: number) => void;
}) {
  const positions = useMemo<[number, number, number][]>(() => {
    const n = slots.length;
    return Array.from({ length: n }, (_, i) => {
      const angle = (i / n) * Math.PI * 2;
      return [
        BAND_RADIUS * Math.cos(angle),
        0,
        BAND_RADIUS * Math.sin(angle),
      ] as [number, number, number];
    });
  }, [slots.length]);

  return (
    <Canvas camera={{ position: [0, 2.4, 2.4], fov: 38 }} dpr={[1, 2]}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 2]} intensity={1.4} />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} />
      <Rig>
        <MetalBand metal={metal} />
        {slots.map((s, i) =>
          s ? (
            <StoneBead
              key={i}
              position={positions[i]}
              hex={s.hex}
              selected={activeSlot === i}
              onClick={() => onSelectSlot(i)}
            />
          ) : (
            <EmptySlotMarker
              key={i}
              position={positions[i]}
              onClick={() => onSelectSlot(i)}
            />
          )
        )}
      </Rig>
      <OrbitControls
        enablePan={false}
        minDistance={2.4}
        maxDistance={4.2}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 6}
      />
    </Canvas>
  );
}
