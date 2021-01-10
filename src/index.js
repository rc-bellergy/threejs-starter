import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
camera.position.set(0, 0, 100)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Sample object
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
cube.position.set(0, 0, 90)
scene.add(cube)
// Sample object end

function animate () {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)

  // Sample animation
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  // Sample animation end
}
animate()
