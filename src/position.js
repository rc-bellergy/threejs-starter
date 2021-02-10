import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { AxisGridHelper } from './AxisGridHelper.js'

/**
 * Reference: https://threejsfundamentals.org/threejs/lessons/threejs-scenegraph.html
 */

function main () {
  // create canvas and renderer
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  const renderer = new THREE.WebGLRenderer({ canvas })

  // create camera
  const fov = 45
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 100
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 40, 0)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  // create scene
  const scene = new THREE.Scene()

  // create light and add to scene
  const color = 0xFFFFFF
  const intensity = 3
  const light = new THREE.PointLight(color, intensity)
  scene.add(light)

  // create your objects below:
  const objects = []
  const sphereGometry = new THREE.SphereBufferGeometry(1, 6, 6)

  const solarSystem = new THREE.Object3D()
  scene.add(solarSystem)
  objects.push(solarSystem)

  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 })
  const sunMesh = new THREE.Mesh(sphereGometry, sunMaterial)
  sunMesh.scale.set(5, 5, 5)
  solarSystem.add(sunMesh)
  objects.push(sunMesh)

  const earthOrbit = new THREE.Object3D()
  earthOrbit.position.x = 10
  solarSystem.add(earthOrbit)
  objects.push(earthOrbit)

  const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233FF, emissive: 0x112244 })
  const earthMesh = new THREE.Mesh(sphereGometry, earthMaterial)
  earthOrbit.add(earthMesh)
  objects.push(earthMesh)

  const moonOrbit = new THREE.Object3D()
  moonOrbit.position.x = 2
  earthOrbit.add(moonOrbit)

  const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 })
  const moonMesh = new THREE.Mesh(sphereGometry, moonMaterial)
  moonMesh.scale.set(0.5, 0.5, 0.5)
  moonOrbit.add(moonMesh)
  objects.push(moonMesh)

  // add an AxesHelper to each node
  objects.forEach((node) => {
    const axes = new THREE.AxesHelper()
    axes.material.depthTest = false // show the axes even inside the spheres
    axes.renderOrder = 1 // draw the axes after the spheres
    node.add(axes)
  })

  // Add AxisGridHelper
  function makeAxisGrid (node, label, units) {
    const helper = new AxisGridHelper(node, units)
    const gui = new dat.GUI()
    gui.add(helper, 'visible').name(label)
  }
  makeAxisGrid(solarSystem, 'solarSystem', 25)
  makeAxisGrid(sunMesh, 'sunMesh')
  makeAxisGrid(earthOrbit, 'earthOrbit')
  makeAxisGrid(earthMesh, 'earthMesh')
  makeAxisGrid(moonOrbit, 'moonOrbit')
  makeAxisGrid(moonMesh, 'moonMesh')
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
    objects.forEach((obj, i) => {
      obj.rotation.y = time
    })
    // Example end

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()
