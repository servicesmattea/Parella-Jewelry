"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type SlotValue = { hex: string; name: string } | null;

const BAND_RADIUS = 1.5;
const SCENE_UNITS_PER_CM = 0.26;

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
    const jitter = 0.82 + rand() * 0.36;
    pos.setXYZ(i, pos.getX(i) * jitter, pos.getY(i) * jitter, pos.getZ(i) * jitter);
  }
  geo.computeVertexNormals();
  return geo;
}

// Thin golden silk thread instead of transparent plastic
function GoldenThread() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[BAND_RADIUS, 0.018, 16, 100]} />
      <meshPhysicalMaterial
        color="#c9a96e"
        roughness={0.22}
        metalness={0.75}
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
    const diff = target - current;
    if (Math.abs(diff) < 0.001) return;
    ref.current.scale.setScalar(current + diff * 0.15);
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
        roughness={0.32}
        metalness={0.04}
        clearcoat={0.65}
        clearcoatRoughness={0.18}
        reflectivity={0.85}
        emissive={selected ? hex : "#000000"}
        emissiveIntensity={selected ? 0.28 : 0}
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
      <torusGeometry args={[radius * 0.85, 0.008, 10, 20]} />
      <meshStandardMaterial color="#c9a96e" transparent opacity={0.5} />
    </mesh>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
  });
  return <group ref={group}>{children}</group>;
}

// Keeps camera pointing at center with smooth distance update
function CameraController({ bandRadius }: { bandRadius: number }) {
  const { camera } = useThree();
  const targetDist = bandRadius * 3.6;

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const cur = new THREE.Vector3(0, bandRadius * 1.2, targetDist);
    cam.position.copy(cur);
    cam.lookAt(0, 0, 0);
    cam.updateProjectionMatrix();
  }, [bandRadius, camera, targetDist]);

  return null;
}

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
  // Cap bead radius so beads never overlap regardless of count
  const beadRadius = useMemo(() => {
    const fromReal = (beadDiameterCm / 2) * SCENE_UNITS_PER_CM;
    const maxFit = (BAND_RADIUS * 2 * Math.PI) / (slots.length * 2.3);
    return Math.min(fromReal, maxFit);
  }, [beadDiameterCm, slots.length]);

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
    <Canvas
      camera={{ position: [0, 1.8, 5.4], fov: 36 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      {/* Ivory background */}
      <color attach="background" args={["#faf7f2"]} />

      {/* Warm natural lighting */}
      <ambientLight intensity={0.9} color="#fff8f0" />
      <directionalLight position={[4, 6, 3]} intensity={1.4} color="#fff4e6" />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#ffe4c4" />
      <pointLight position={[0, 4, 0]} intensity={0.5} color="#c9a96e" distance={12} decay={2} />

      <CameraController bandRadius={BAND_RADIUS} />

      <Rig>
        <GoldenThread />
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
        minDistance={BAND_RADIUS * 2.2}
        maxDistance={BAND_RADIUS * 5.5}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 6}
      />
    </Canvas>
  );
}
