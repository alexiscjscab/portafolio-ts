import React, { useMemo } from "react";
import * as THREE from "three";

// Componente para la órbita
export const Orbit: React.FC<{ radius: number }> = ({ radius }) => {
  const orbitMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({
      color: 'rgba(30,80,200,1)',
      side: THREE.DoubleSide,
    }),
    []
  );

  const orbitGeometry = useMemo(
    () => new THREE.RingGeometry(radius, radius + 0.1, 64),
    [radius]
  );

  return (
    <mesh rotation-x={Math.PI / 2} material={orbitMaterial} geometry={orbitGeometry} />
  );
};
