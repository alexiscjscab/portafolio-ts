import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import meteorito from '../../assets/planets/meteorito.jpg';

const textureMeteorito = new THREE.TextureLoader().load(meteorito);

const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const Comet: React.FC = () => {
  const cometRef = useRef<THREE.Mesh>(null);
  const size = useMemo(() => getRandom(0.1, 1), []);
  const speed = useMemo(() => getRandom(0.5, 2), []);
  const position = useMemo<[number, number, number]>(
    () => [getRandom(-40, 40), getRandom(-40, 40), getRandom(-40, 40)],
    []
  );

  useFrame(() => {
    if (cometRef.current) {
      cometRef.current.position.x -= speed;
      cometRef.current.rotation.y += 0.05;
      if (cometRef.current.position.x < -50) {
        cometRef.current.position.x = 50;
      }
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        // color: 'rgba(100,50,100,0.5)',
        map: textureMeteorito,
        emissive: new THREE.Color('brown'),
        emissiveIntensity: 1.2,
        metalness: 0.8,
        roughness: 0.5,
      }),
    []
  );

  return (
    <>
      <mesh ref={cometRef} position={position} material={material}>
        <sphereGeometry args={[size, 80, 80]} />
      </mesh>
      {/* Sistema de partículas */}
    </>
  );
};
