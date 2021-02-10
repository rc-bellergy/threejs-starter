import './style.css'
import * as THREE from 'three'

/**
 * Reference: https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html
 */

function main () {
  // create canvas and renderer
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  const renderer = new THREE.WebGLRenderer({ canvas })

  // create camera
  const fov = 75
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 5
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 2

  // create scene
  const scene = new THREE.Scene()

  // create light and add to scene
  const color = 0xFFFFFF
  const intensity = 1
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  scene.add(light)

  // create your objects below:
  // Example: create 3 cubes and add to scene
  const boxWidth = 1
  const boxHeight = 1
  const boxDepth = 1
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)

  function makeInstance (geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    cube.position.x = x
    return cube
  }
  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2)
  ]
  // Example end

  // Manage window resize and ratio of canvas
  // Reference: https://threejsfundamentals.org/threejs/lessons/threejs-responsive.html
  function resizeRendererToDisplaySize (renderer) {
    const canvas = renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = canvas.clientWidth * pixelRatio | 0
    const height = canvas.clientHeight * pixelRatio | 0
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  // start animation
  function render (time) {
    time *= 0.001 // convert time to seconds
    const canvas = renderer.domElement
    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()

    // Create you animation update:
    // Example: move 3 cubes
    cubes.forEach((cube, i) => {
      const speed = 1 + i * 0.1
      const rot = time * speed
      cube.rotation.x = rot
      cube.rotation.y = rot
      console.log(rot)
    })
    // Example end

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()
