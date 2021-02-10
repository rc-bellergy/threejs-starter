// Sample of loading glb objects

import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

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
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 10

  // create scene
  const scene = new THREE.Scene()

  // create light and add to scene
  const color = 0xFF0000
  // const intensity = 1
  const light = new THREE.DirectionalLight(color)
  light.position.set(20, 20, 50)
  scene.add(light)

  // Example
  let obj = null
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('lib/draco/gltf/')
  dracoLoader.preload()

  const loader = new GLTFLoader().setPath('models/')
  loader.setDRACOLoader(dracoLoader)
  loader.load('ico-more.glb', (gltf) => {
    obj = gltf.scene
    scene.add(obj)
  }, undefined, function (error) {
    console.error(error)
  })
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

    // Create you animation update
    if (obj) {
      const rot = time
      obj.rotation.x = rot
      obj.rotation.y = rot / 2
      obj.rotation.z = rot / 3
    }
    // Example end

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()
