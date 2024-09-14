import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
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
  planetName?: string; // Nueva propiedad para el nombre del planeta
  moonName?: string;   // Nueva propiedad para el nombre de la luna
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
  planetName = "Planet", // Valor predeterminado para el nombre del planeta
  moonName = "Moon",     // Valor predeterminado para el nombre de la luna
}) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const planetTextRef = useRef<THREE.Mesh>(null); // Referencia para el texto del planeta
  const moonTextRef = useRef<THREE.Mesh>(null);   // Referencia para el texto de la luna

  // Acceso a la cámara desde el contexto de three.js
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const planetPositionX = distance * Math.cos(elapsedTime * speed);
    const planetPositionZ = distance * Math.sin(elapsedTime * speed);

    if (planetRef.current) {
      planetRef.current.position.set(planetPositionX, 0, planetPositionZ);
      planetRef.current.rotation.y += 0.01;
    }

    if (hasMoon && moonRef.current) {
      const moonPositionX = planetPositionX + size * 2 * Math.cos(elapsedTime * speed * 2);
      const moonPositionZ = planetPositionZ + size * 2 * Math.sin(elapsedTime * speed * 2);

      moonRef.current.position.set(moonPositionX, 0, moonPositionZ);

      // Posicionar el texto sobre la luna
      if (moonTextRef.current) {
        moonTextRef.current.position.set(moonPositionX, size * 0.2 + 0.5, moonPositionZ);
        moonTextRef.current.lookAt(camera.position); // Hacer que el texto de la luna mire a la cámara
      }
    }

    // Posicionar el texto sobre el planeta
    if (planetTextRef.current) {
      planetTextRef.current.position.set(planetPositionX, size + 0.5, planetPositionZ);
      planetTextRef.current.lookAt(camera.position); // Hacer que el texto del planeta mire a la cámara
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
        <>
          <mesh ref={moonRef}>
            <sphereGeometry args={[size * 0.2, 32, 32]} />
            <meshStandardMaterial map={textureLuna} />
          </mesh>
          {/* Texto sobre la Luna */}
          <Text
            ref={moonTextRef}
            fontSize={size * 0.2} // Tamaño del texto relativo al tamaño de la luna
            color="white" // Color del texto
            anchorX="center"
            anchorY="middle"
          >
            {moonName}
          </Text>
        </>
      )}
      {/* Texto sobre el planeta */}
      <Text
        ref={planetTextRef}
        fontSize={size * 0.5} // Tamaño del texto relativo al tamaño del planeta
        color="white" // Color del texto
        anchorX="center"
        anchorY="middle"
      >
        {planetName}
      </Text>
    </group>
  );
};
