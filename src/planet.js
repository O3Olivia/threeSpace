import * as THREE from 'three';

function createPlanet({ surface, atmosphere }) {

  const planetGroup = new THREE.Group();

  const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);


  // Surface 
    
    const surfaceGeometry = new THREE.SphereGeometry(surface.size, 32, 32);
    const surfaceMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(surface.textures.map),
      bumpMap: new THREE.TextureLoader().load(surface.textures.bumpMap),
      bumpScale: surface.material.bumpScale,
      specular: surface.material.specular,
      shininess: surface.material.shininess,
      specularMap: new THREE.TextureLoader().load(surface.textures.specularMap),
    });
    
    const planetSurface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
    planetGroup.add(planetSurface);

  // Atmosphere 
    
    const atmosphereGeometry = new THREE.SphereGeometry(surface.size + atmosphere.size, 32, 32);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(atmosphere.textures.map),
      alphaMap: new THREE.TextureLoader().load(atmosphere.textures.alphaMap),
      transparent: true,
      opacity: atmosphere.material.opacity,
      depthWrite: false,
    });
    
    const planetAtmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  planetGroup.add(planetAtmosphere);
  
  // Glow 
    const glowGeometry = new THREE.SphereGeometry(surface.size + atmosphere.glow.size, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        'c': { type: 'f', value: atmosphere.glow.intensity },
        'p': { type: 'f', value: atmosphere.glow.fade },
        glowColor: { type: 'c', value: new THREE.Color(atmosphere.glow.color) },
        viewVector: { type: 'v3', value: camera.position }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = modelViewPosition.xyz;
          gl_Position = projectionMatrix * modelViewPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform float c;
        uniform float p;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          float intensity = pow(c - dot(vNormal, normalize(vViewPosition)), p);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
  });
  

    const planetGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    planetGroup.add(planetGlow);

  


  return planetGroup;
}

export default createPlanet