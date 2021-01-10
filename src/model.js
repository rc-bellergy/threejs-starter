import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
camera.position.set(0, 0, 500)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Load model
let object
const loader = new GLTFLoader()
loader.load('models/robot_police_little_helper/scene.gltf', function (gltf) {
  object = gltf.scene
  scene.add(object)
}, undefined, function (error) {
  console.error(error)
})
// Load model end

function animate () {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)

  // Sample animation
  if (object) {
    object.rotation.x += 0.01
    object.rotation.y += 0.01
  }
  // Sample animation end
}
animate()
