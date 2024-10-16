import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import createPlanet from './planet';
import cat from './cat'
import * as dat from 'dat.gui'


export default function spaceProject() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.set(20, 10, 40);
	camera.rotateX = 20
	scene.add(camera);


		// Controls
	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true
	controls.autoRotate = true
	controls.autoRotateSpeed = 0.7
	
	const moonOrbitControl = {
		rotate: true,
		speed: 0.5
	}


	const gui = new dat.GUI();
	gui.add(camera.position, 'x', -50, 50).name('Camera X');
	gui.add(camera.position, 'y', -45, 45).name('Camera Y');
	gui.add(camera.position, 'z', -5, 5).name('Camera Z');
	gui.add(moonOrbitControl, 'speed', 0, 2).name('Moon Orbit Speed');
	
	gui.add(moonOrbitControl, 'rotate').name('Moon Orbit Rotation');
	gui.add(controls, 'autoRotate').name('Camera Play');


	// Light
	const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(50, 50, 50);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(10, 10, 20);
  pointLight.castShadow = true;
	scene.add(pointLight);

	const spotLight = new THREE.PointLight(0xffffff, 150, 200, 1.7, 12)
  spotLight.position.set(11, 27, 0);
	scene.add(spotLight)

	


	const earth = createPlanet({
    surface: {
      size: 15,
      material: {
        bumpScale: 6,
        specular: new THREE.Color('grey'),
        shininess: 30
      },
      textures: {
        map: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthmap1k.jpg',
        bumpMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthbump1k.jpg',
        specularMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthspec1k.jpg'
      }
    },
    atmosphere: {
      size: 0.2,
      material: {
        opacity: 0.9
      },
      textures: {
        map: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmap.jpg',
        alphaMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmaptrans.jpg',
				
      },
      glow: {
        size: 0.1,
        intensity: 1.0,
        fade: 1.9,
        color: '#1d657b'
      }
    }
  });

	const earthOrbit = new THREE.Object3D()
	earthOrbit.add(earth)
	scene.add(earthOrbit)

	// earth position
	earth.position.set(10, 0, 0)

	const moon = createPlanet({
    surface: {
      size: 6,
      material: {
        bumpScale: 6,
        specular: new THREE.Color('grey'),
        shininess: 30
      },
      textures: {
        map: 'https://i2.wp.com/kaimoisch.com/wp-content/uploads/2020/01/moon-rough.jpg',
        bumpMap: 'https://i1.wp.com/kaimoisch.com/wp-content/uploads/2020/01/moon-height.jpg',
        specularMap: 'https://i2.wp.com/kaimoisch.com/wp-content/uploads/2020/01/moon-specular.jpg'
      }
    },
    atmosphere: {
      size: 0.08,
      material: {
        opacity: 0.8
      },
      textures: {
        map: 'https://i1.wp.com/kaimoisch.com/wp-content/uploads/2020/01/moon-albedo.jpg',
        alphaMap: 'https://i1.wp.com/kaimoisch.com/wp-content/uploads/2020/01/moon-normal.jpg',
				
      },
      glow: {
        size: 0.03,
        intensity: 1.0,
        fade: 3,
        color: '#848484'
      }
    }
  });

	const moonOrbit = new THREE.Object3D()
	moonOrbit.add(moon)
	scene.add(moonOrbit)

	// moon position
	moon.position.set(40, 0, 0)


	// star 
  const starGeometry = new THREE.SphereGeometry(0.1, 16, 16); 
  const starMaterial = new THREE.MeshBasicMaterial({ color: '#FFF1' });

	const stars = [];
  for (let i = 0; i < 1000; i++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(
      THREE.MathUtils.randFloatSpread(200), 
      THREE.MathUtils.randFloatSpread(200), 
      THREE.MathUtils.randFloatSpread(200)  
		);
		stars.push(star)
    scene.add(star);
  }

	const catCharacter = cat();  
	catCharacter.position.set(11, 15.5, 0); 
	scene.add(catCharacter);  

	
	const dragControls = new DragControls([catCharacter], camera, renderer.domElement);
	dragControls.transformGroup = true
	dragControls.addEventListener('dragstart', (e) => {
  controls.enabled = false;
});

dragControls.addEventListener('dragend', (e) => {
  controls.enabled = true; 
});
	dragControls.addEventListener('dragstart', (e) => {
		console.log(e.object.name); 
	});
 

	
	const galaxyGeometry = new THREE.SphereGeometry(100, 64, 64);
  const galaxyMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/starfield.png'),
    side: THREE.BackSide
  });
  const starMesh = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
  scene.add(starMesh);



	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		controls.update()

		// star
		stars.forEach((star) => {
			star.position.x += 0.1
			if (star.position.x > 100) {
				star.position.x = -100
			}
		})

		if (moonOrbitControl.rotate) {
      moonOrbit.rotation.y += delta * moonOrbitControl.speed;
    }
		dragControls.update(delta)

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
