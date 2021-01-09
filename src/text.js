import './style.css';
import JsonFont from './json-fonts/helvetiker_regular.typeface.json';
import * as THREE from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set( 0, 0, 300 );
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creating text
const geometry = new THREE.TextGeometry( 'Hello three.js!', {
    font: new THREE.Font(JsonFont),
    size: 20,
    height: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1
} );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const text = new THREE.Mesh( geometry, material );
scene.add( text );

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

    // Sample 
    if (text) {
        text.rotation.x += 0.01;
        text.rotation.y += 0.01;
    }
    // Sample animation end
}
animate();