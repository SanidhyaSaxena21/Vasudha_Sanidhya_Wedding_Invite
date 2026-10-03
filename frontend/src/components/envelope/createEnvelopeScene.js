import * as THREE from "three";
import { createPaperTextures } from "./paperTextures";

function paperShape(points, texture, bounds, reverse = false) {
  const shape = new THREE.Shape(points.map(([x, y]) => new THREE.Vector2(x, y)));
  const geometry = new THREE.ShapeGeometry(shape);
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    const v = (position.getY(i) - bounds[1]) / bounds[3];
    uv.setXY(i, (position.getX(i) - bounds[0]) / bounds[2], reverse ? 1 - v : v);
  }
  const material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.94,
    bumpMap: texture, bumpScale: 0.016, side: reverse ? THREE.BackSide : THREE.FrontSide });
  const mesh = new THREE.Mesh(geometry, material); mesh.castShadow = true; mesh.receiveShadow = true;
  return mesh;
}

export function createEnvelopeScene() {
  const scene = new THREE.Scene();
  const envelope = new THREE.Group(); scene.add(envelope);
  const textures = createPaperTextures();
  scene.add(new THREE.AmbientLight(0xffeee0, 1.4));
  const key = new THREE.DirectionalLight(0xffe7c4, 2.3); key.position.set(-3, 6, 8);
  key.castShadow = true; key.shadow.mapSize.set(1024, 1024); key.shadow.camera.left = -7; key.shadow.camera.right = 7;
  key.shadow.camera.top = 8; key.shadow.camera.bottom = -5; key.shadow.bias = -0.001; key.shadow.normalBias = 0.012;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.8); fill.position.set(4, 0, 6); scene.add(fill);

  const board = new THREE.Mesh(new THREE.BoxGeometry(6, 3.7, 0.07), new THREE.MeshStandardMaterial({ color: "#421622", roughness: 1 }));
  board.position.z = -0.065; board.castShadow = true; envelope.add(board);
  const bounds = [-3, -1.85, 6, 3.7];
  const back = paperShape([[-3, -1.85], [3, -1.85], [3, 1.85], [-3, 1.85]], textures.outer, bounds);
  envelope.add(back);

  const card = paperShape([[-2.78, -1.73], [2.78, -1.73], [2.78, 1.73], [-2.78, 1.73]], textures.card, [-2.78, -1.73, 5.56, 3.46]);
  card.position.set(0, 0, 0.085); envelope.add(card);
  const left = paperShape([[-3, -1.85], [0.08, -0.71], [-3, 1.85]], textures.outer, bounds);
  left.position.z = 0.15; envelope.add(left);
  const right = paperShape([[3, -1.85], [3, 1.85], [-0.08, -0.71]], textures.outer, bounds);
  right.position.z = 0.17; envelope.add(right);
  const pocket = paperShape([[-3, -1.85], [3, -1.85], [3, 0.25], [0, -0.71], [-3, 0.25]], textures.outer, bounds);
  pocket.position.z = 0.21; envelope.add(pocket);
  // Raised folds catch the light like thick, cut paper rather than a flat illustration.
  const seamMaterial = new THREE.LineBasicMaterial({ color: "#b28064", transparent: true, opacity: 0.47 });
  const seamGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3, 0.25, 0.217), new THREE.Vector3(0, -0.71, 0.217), new THREE.Vector3(3, 0.25, 0.217)]);
  envelope.add(new THREE.Line(seamGeometry, seamMaterial));

  const flap = new THREE.Group(); flap.position.set(0, 1.85, 0.27); envelope.add(flap);
  const flapPoints = [[-3, 0], [-3, -0.85], [-0.15, -2.49], [0, -2.53], [0.15, -2.49], [3, -0.85], [3, 0]];
  flap.add(paperShape(flapPoints, textures.flap, [-3, -2.53, 6, 2.53]));
  const inside = paperShape(flapPoints, textures.inner, [-3, -2.53, 6, 2.53], true);
  inside.position.z = -0.018; flap.add(inside);

  const seal = new THREE.Group(); seal.position.set(0, -0.69, 0.34); envelope.add(seal);
  const goldMaterial = new THREE.MeshStandardMaterial({ color: "#b78a40", metalness: 0.65, roughness: 0.38 });
  const wax = new THREE.Mesh(new THREE.CylinderGeometry(0.365, 0.39, 0.065, 48), goldMaterial);
  wax.rotation.x = Math.PI / 2; wax.castShadow = true; seal.add(wax);
  const face = new THREE.Mesh(new THREE.CircleGeometry(0.356, 64), new THREE.MeshStandardMaterial({ map: textures.seal, roughness: 0.53, metalness: 0.12 }));
  face.position.z = 0.036; seal.add(face);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.012, 8, 64), goldMaterial);
  ring.position.z = 0.046; seal.add(ring);

  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: 0.32 }));
  shadow.position.z = -0.55; shadow.receiveShadow = true; scene.add(shadow);

  return { scene, envelope, flap, card, seal, dispose() {
    const geometries = new Set(), materials = new Set();
    scene.traverse((object) => {
      if (object.geometry) geometries.add(object.geometry);
      if (object.material) materials.add(object.material);
    });
    geometries.forEach((geometry) => geometry.dispose()); materials.forEach((material) => material.dispose());
    Object.values(textures).forEach((texture) => texture.dispose()); key.shadow.dispose();
  } };
}