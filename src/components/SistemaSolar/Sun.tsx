import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import sol from "../../assets/planets/sol.jpg";

export const Sun: React.FC = () => {
  const textureSol = new THREE.TextureLoader().load(sol);
  const sunRef = useRef<THREE.Mesh>(null);

  const sunMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: textureSol,
      emissive: new THREE.Color("#ff4"),
      emissiveIntensity: 1.2

    });
  }, []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (sunRef.current) {
      sunRef.current.rotation.y = elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[5, 40, 40]} />
      <meshStandardMaterial attach="material" {...sunMaterial} />
    </mesh>
  );
};

