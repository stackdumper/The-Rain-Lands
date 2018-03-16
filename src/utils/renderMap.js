import * as THREE from 'three';
import objectGenerator from './objectGenerator';

export default (map, blocks) => {
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const layers = {};

  map.forEach((xLayer, x) => {
    xLayer.forEach((yLayer, z) => {
      yLayer.forEach((zBlock, y) => {
        if (!layers[zBlock]) {
          const geometry = new THREE.Geometry();

          const materials = blocks[zBlock].texture.map((texture) => {
            const material = new THREE.MeshLambertMaterial();
            material.map = new THREE.TextureLoader().load(texture);

            return material;
          });

          const mesh = new THREE.Mesh(cubeGeometry);
          mesh.position.set(x, y, z);

          mesh.updateMatrix();
          geometry.merge(mesh.geometry, mesh.matrix);

          layers[zBlock] = {
            geometry,
            materials,
          };
        } else {
          const mesh = new THREE.Mesh(cubeGeometry);
          mesh.position.set(x, y, z);

          mesh.updateMatrix();
          layers[zBlock].geometry.merge(mesh.geometry, mesh.matrix);
        }
      });
    });
  });

  return Object.keys(layers).map(key => new THREE.Mesh(layers[key].geometry, layers[key].materials));
};

// export default (map, blocks) => {
//   const mergedGeometry = new THREE.Geometry();
//   const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
//   const material = new THREE.MeshLambertMaterial();
//
//   // material.map = new THREE.TextureLoader().load(grassTexture);
//
//   let i = 0;
//
//   map.map((width, x) => {
//     width.map((height, y) => {
//       height.map((block, z) => {
//         i += 1;
//
//         const mesh = new THREE.Mesh(boxGeometry);
//         mesh.position.set(x, y, z);
//
//         mesh.updateMatrix();
//         mergedGeometry.merge(mesh.geometry, mesh.matrix);
//       });
//     });
//   });
//
//   console.log(i);
//
//   const rendered = new THREE.Mesh(mergedGeometry, material);
//   rendered.doubleSided = false;
//
//   return rendered;
// };

// export default (map) => {
//   const mergedGeometry = new THREE.Geometry();
//   const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
//   const material = new THREE.MeshLambertMaterial();
//
//   material.map = new THREE.TextureLoader().load(grassTexture);
//
//   let i = 0;
//
//   map.map((width, x) => {
//     width.map((height, y) => {
//       height.map((block, z) => {
//         i += 1;
//
//         boxGeometry.translate(x, y, z);
//         mergedGeometry.merge(boxGeometry);
//         boxGeometry.translate(-x, -y, -z);
//       });
//     });
//   });
//
//   console.log(i);
//
//   const rendered = new THREE.Mesh(mergedGeometry, material);
//   rendered.doubleSided = false;
//
//   return rendered;
// };
