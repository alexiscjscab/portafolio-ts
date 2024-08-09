import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import luna from "../../assets/planets/luna.jpg";

const textureLuna = new THREE.TextureLoader().load(luna);

interface PlanetProps {
  texture?: THREE.Texture;
  color?: string;
  size: number;
  distance: number;
  speed: number;
  emissive?: string;
  emissiveIntensity?: number;
  hasRings?: boolean;
  ringTexture?: THREE.Texture;
  ringSize?: number;
  hasMoon?: boolean;
}

export const Planet: React.FC<PlanetProps> = ({
  texture,
  color,
  size,
  distance,
  speed,
  emissive,
  emissiveIntensity,
  hasRings = false,
  ringTexture,
  ringSize = 1.5,
  hasMoon = false,
}) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (planetRef.current) {
      planetRef.current.position.set(
        distance * Math.cos(elapsedTime * speed),
        0,
        distance * Math.sin(elapsedTime * speed)
      );
      planetRef.current.rotation.y += 0.01;
    }
    if (hasMoon && moonRef.current) {
      moonRef.current.position.set(
        distance * Math.cos(elapsedTime * speed * 2) * size * 2,
        0,
        distance * Math.sin(elapsedTime * speed * 2) * size * 2
      );
    }
  });

  const planetMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: texture,
        color,
        emissive: emissive ? new THREE.Color(emissive) : undefined,
        emissiveIntensity,
        roughness: 0.7,
        metalness: 0.2,
      }),
    [texture, color, emissive, emissiveIntensity]
  );

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      }),
    [ringTexture]
  );

  return (
    <group>
      <mesh ref={planetRef} material={planetMaterial}>
        <sphereGeometry args={[size, 64, 64]} />
        {hasRings && (
          <mesh rotation-x={Math.PI / 2} material={ringMaterial}>
            <ringGeometry args={[size * ringSize, size * ringSize + 0.1, 64]} />
          </mesh>
        )}
      </mesh>
      {hasMoon && (
        <mesh ref={moonRef}>
          <sphereGeometry args={[size * 0.2, 32, 32]} />
          <meshStandardMaterial map={textureLuna} />
        </mesh>
      )}
    </group>
  );
};
