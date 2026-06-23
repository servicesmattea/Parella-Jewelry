"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type SlotValue = { hex: string; name: string } | null;

const BAND_RADIUS = 1.5;

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createStoneGeometry(seed: number, radius: number) {
  const geo = new THREE.IcosahedronGeometry(radius, 0);
  const pos = geo.attributes.position;
  const rand = mulberry32(seed);
  for (let i = 0; i < pos.count; i++) {
    const jitter = 0.8 + rand() * 0.4;
    pos.setXYZ(i, pos.getX(i) * jitter, pos.getY(i) * jitter, pos.getZ(i) * jitter);
  }
  geo.computeVertexNormals();
  return geo;
}

function TransparentCord() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[BAND_RADIUS, 0.022, 16, 120]} />
      <meshPhysicalMaterial
        color="#ffffff"
        transparent
        opacity={0.4}
        roughness={0.15}
        transmission={0.85}
        thickness={0.05}
        ior={1.3}
      />
    </mesh>
  );
}

function StoneBead({
  position,
  hex,
  index,
  radius,
  selected,
  onClick,
}: {
  position: [number, number, number];
  hex: string;
  index: number;
  radius: number;
  selected: boolean;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const geometry = useMemo(
    () => createStoneGeometry(index + 1, radius),
    [index, radius]
  );
  const baseRotation = useMemo(() => {
    const rand = mulberry32(index + 101);
    return [rand() * Math.PI, rand() * Math.PI, rand() * Math.PI] as const;
  }, [index]);

  useFrame(() => {
    if (!ref.current) return;
    const target = hovered || selected ? 1.3 : 1;
    const current = ref.current.scale.x;
    ref.current.scale.setScalar(current + (target - current) * 0.15);
  });

  return (
    <mesh
      ref={ref}
      position={position}
      rotation={baseRotation as unknown as [number, number, number]}
      geometry={geometry}
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
      <meshPhysicalMaterial
        color={hex}
        roughness={0.45}
        metalness={0}
        clearcoat={0.4}
        clearcoatRoughness={0.3}
        emissive={selected ? hex : "#000000"}
        emissiveIntensity={selected ? 0.4 : 0}
      />
    </mesh>
  );
}

function EmptySlotMarker({
  position,
  radius,
  onClick,
}: {
  position: [number, number, number];
  radius: number;
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
      <torusGeometry args={[radius, 0.012, 12, 24]} />
      <meshStandardMaterial color="#B9A17E" transparent opacity={0.45} />
    </mesh>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.1;
  });
  return <group ref={group}>{children}</group>;
}

// Scene units per cm of real bead diameter, calibrated so the original
// fixed 0.1 radius corresponds to a ~0.77cm bead.
const SCENE_UNITS_PER_CM = 0.26;

export default function BraceletScene({
  slots,
  activeSlot,
  beadDiameterCm = 0.77,
  onSelectSlot,
}: {
  slots: SlotValue[];
  activeSlot: number;
  beadDiameterCm?: number;
  onSelectSlot: (i: number) => void;
}) {
  const beadRadius = (beadDiameterCm / 2) * SCENE_UNITS_PER_CM;

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
    <Canvas camera={{ position: [0, 1.8, 3.6], fov: 36 }} dpr={[1, 2]}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 2]} intensity={1.4} />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} />
      <Rig>
        <TransparentCord />
        {slots.map((s, i) =>
          s ? (
            <StoneBead
              key={i}
              position={positions[i]}
              hex={s.hex}
              index={i}
              radius={beadRadius}
              selected={activeSlot === i}
              onClick={() => onSelectSlot(i)}
            />
          ) : (
            <EmptySlotMarker
              key={i}
              position={positions[i]}
              radius={beadRadius}
              onClick={() => onSelectSlot(i)}
            />
          )
        )}
      </Rig>
      <OrbitControls
        enablePan={false}
        minDistance={3.0}
        maxDistance={5.4}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 6}
      />
    </Canvas>
  );
}
