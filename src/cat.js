import * as THREE from 'three';

export default function cat() {

const group = new THREE.Group();

  
const textureLoader = new THREE.TextureLoader()
const catFur = textureLoader.load('/texture/fur.jpg');
  const catEyeball = textureLoader.load('/texture/cat_eyes.png'); 
  catEyeball.wrapS = THREE.RepeatWrapping;
catEyeball.wrapT = THREE.RepeatWrapping;
  catEyeball.repeat.set(1.05, 1.05);
  catEyeball.offset.set(0.2, -0.1)


// HEAD
const headGeometry = new THREE.SphereGeometry(1, 32, 32);
  const headMaterial = new THREE.MeshStandardMaterial({
    map: catFur,
    side: THREE.DoubleSide,
  });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.set(0, 1.5, 0);
group.add(head);


// BODY
const bodyGeometry = new THREE.SphereGeometry(0.8, 32, 32);
const bodyMaterial = new THREE.MeshStandardMaterial({ map: catFur,
    side: THREE.DoubleSide, });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.set(0, 0.5, 0);
group.add(body);

//  EARS
const earGeometry = new THREE.ConeGeometry(0.25, 0.5, 32);
const earMaterial = new THREE.MeshStandardMaterial({ map: catFur,
    side: THREE.DoubleSide, });

const leftEar = new THREE.Mesh(earGeometry, earMaterial);
leftEar.position.set(-0.6, 2.2, 0);
leftEar.rotation.z = Math.PI / 8;
group.add(leftEar);

const rightEar = new THREE.Mesh(earGeometry, earMaterial);
rightEar.position.set(0.6, 2.2, 0);
rightEar.rotation.z = -Math.PI / 8;
group.add(rightEar);

// EYES
const eyeGeometry = new THREE.SphereGeometry(0.15, 32, 32);
  const eyeMaterial = new THREE.MeshStandardMaterial({
    // color: 0x000000
    map: catEyeball
  });

const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(-0.35, 1.6, 0.9);
group.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(0.35, 1.6, 0.9);
group.add(rightEye);

// NOSE
const noseGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const noseMaterial = new THREE.MeshStandardMaterial({ color: 0xff6666 });
const nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.position.set(0, 1.4, 1);
group.add(nose);

// 수염
const whiskerMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const whiskerGeometry1 = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-0.2, 1.4, 1),
  new THREE.Vector3(-0.6, 1.3, 1),
]);
const whisker1 = new THREE.Line(whiskerGeometry1, whiskerMaterial);
group.add(whisker1);

const whiskerGeometry2 = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0.2, 1.4, 1),
  new THREE.Vector3(0.6, 1.3, 1),
]);
const whisker2 = new THREE.Line(whiskerGeometry2, whiskerMaterial);
group.add(whisker2);

// LEGS
const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 32);
const legMaterial = new THREE.MeshStandardMaterial({ map: catFur,
    side: THREE.DoubleSide, });

const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
frontLeftLeg.position.set(-0.4, 0, 0.4);
group.add(frontLeftLeg);

const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
frontRightLeg.position.set(0.4, 0, 0.4);
group.add(frontRightLeg);

const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
backLeftLeg.position.set(-0.4, 0, -0.4);
group.add(backLeftLeg);

const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
backRightLeg.position.set(0.4, 0, -0.4);
group.add(backRightLeg);

// TAIL
const tailGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 32);
const tailMaterial = new THREE.MeshStandardMaterial({ map: catFur,
    side: THREE.DoubleSide, });
const tail = new THREE.Mesh(tailGeometry, tailMaterial);
tail.position.set(0, 0.5, -0.8);
tail.rotation.x = Math.PI / 4;
group.add(tail);

  
  return group

}