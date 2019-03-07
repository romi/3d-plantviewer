import React, { useRef, useEffect, useState } from 'react'
import NaturalSort from 'alphanum-sort'
import * as THREE from 'three'
import { last } from 'lodash'

import { basename } from 'common/routing'

import { styled } from 'rd/nano'

import { useLayers, useSelectedcamera } from 'flow/settings/accessors'
import { useScanFiles, useScan } from 'flow/scans/accessors'

import WorldObject from './object'

const Container = styled.div({
  width: '100%',
  height: '100%'
})

const getSize = (elem) => elem.getBoundingClientRect()

const imgLoader = new THREE.TextureLoader()

export function forgeCameraPoints (poses) {
  if (poses) {
    let index = 0

    return NaturalSort(
      poses.map((d) => d.photoUri)
    ).map((key) => {
      const point = poses.find((d) => d.photoUri === key)

      const m3rotation = new THREE.Matrix3()
      m3rotation.set(
        ...point.rotmat[0],
        ...point.rotmat[1],
        ...point.rotmat[2]
      )
      m3rotation.transpose()
      m3rotation.multiplyScalar(-1)

      const v3position = new THREE.Vector3(
        point.tvec[0],
        point.tvec[1],
        point.tvec[2]
      ).applyMatrix3(m3rotation)

      function createM4Rot (rotmat) {
        const m4rotation = new THREE.Matrix4()
        m4rotation.set(
          ...point.rotmat[0], 0,
          ...point.rotmat[1], 0,
          ...point.rotmat[2], 0,
          0, 0, 0, 1
        )
        return m4rotation
      }

      const objM4rotation = createM4Rot()
      const objT = new THREE.Matrix4().makeRotationX(-Math.PI / 2)
      objM4rotation.transpose()
      objM4rotation.multiply(objT)

      const vueM4rotation = createM4Rot()
      const vueT = new THREE.Matrix4().makeRotationX(-Math.PI)
      vueM4rotation.transpose()
      vueM4rotation.multiply(vueT)

      return {
        index: index++,
        id: key,
        fileName: last(point.photoUri.split('/')),
        ...point,
        v3position,
        objM4rotation,
        vueM4rotation,
        texture: imgLoader.load(`${basename}data/${point.photoUri}`)
      }
    })
  } else {
    return []
  }
}

export default function WorldComponent (props) {
  const canvasRef = useRef(null)
  const [world, setWorld] = useState(null)
  const [layers] = useLayers()
  const [selectedCamera] = useSelectedcamera()
  const [dragging, setDragging] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [center] = useState({ x: 0, y: 0 })
  const [targetZoom, setTargetZoom] = useState({ x: 0, y: 0 })
  const [event, setEvent] = useState(null)

  const [scan] = useScan()
  const [
    [meshGeometry],
    [pointCloudGeometry]
  ] = useScanFiles(scan)

  useEffect(
    () => {
      const { width, height } = getSize(canvasRef.current)
      const world = new WorldObject(width, height, canvasRef.current)
      console.log('ok')
      center.x = width / 2
      center.y = height / 2
      setWorld(world)

      return () => world.unmount()
    },
    [canvasRef]
  )

  useEffect(
    () => {
      if (world) {
        const { width, height } = getSize(canvasRef.current)

        const newWidth = width * zoom
        const newHeight = height * zoom

        if (event === 'pan') {
          center.x += (targetZoom.mx / zoom)
          center.y += (targetZoom.my / zoom)
        }

        const margin = {
          x: -(
            (newWidth / 2) -
            ((width / 2) + ((width / 2) - center.x) * -zoom)
          ),
          y: -(
            (newHeight / 2) -
            ((height / 2) + ((height / 2) - center.y) * -zoom)
          )
        }

        world.setViewport(
          zoom,
          margin.x,
          margin.y,
          newWidth,
          newHeight
        )
      }
    },
    [world, zoom, targetZoom, event]
  )

  useEffect(
    () => {
      if (world && scan && scan.workspace) world.setWorkSpace(scan.workspace)
    },
    [world, scan, meshGeometry, pointCloudGeometry]
  )

  useEffect(
    () => {
      if (world && scan && scan.camera) world.setCamera(scan.camera)
    },
    [world, scan, meshGeometry, pointCloudGeometry]
  )

  useEffect(
    () => {
      if (world && scan && scan.camera) {
        world.setCameraPoints(
          forgeCameraPoints(scan.camera.poses)
        )
      }
    },
    [world, scan]
  )

  useEffect(
    () => {
      if (world) world.setSelectedCamera(selectedCamera)
    },
    [world, selectedCamera]
  )

  useEffect(
    () => {
      if (world && meshGeometry) world.setMeshGeometry(meshGeometry)
    },
    [world, meshGeometry]
  )
  useEffect(
    () => {
      if (world && pointCloudGeometry) {
        world.setPointcloudGeometry(pointCloudGeometry)
      }
    },
    [world, pointCloudGeometry]
  )

  useEffect(
    () => {
      if (
        world && scan && scan.data.skeleton
      ) world.setSkeletonPoints(scan.data.skeleton)
    },
    [world, scan]
  )

  useEffect(
    () => {
      if (
        world && scan && scan.data.angles
      ) world.setAnglesPoints(scan.data.angles)
    },
    [world, scan]
  )

  useEffect(
    () => {
      if (world) world.setLayers(layers)
    },
    [world, layers]
  )

  return <Container
    onMouseDown={() => setDragging(true)}
    onMouseUp={() => setDragging(false)}
    onMouseMove={(e) => {
      if (dragging) {
        setTargetZoom({
          mx: e.movementX,
          my: e.movementY,
          x: targetZoom.x + e.movementX,
          y: targetZoom.y + e.movementY,
          last: targetZoom.last
        })
        setEvent('pan')
      }
    }}
    onWheel={(e) => {
      const newZoom = Math.min(
        Math.max(zoom + (-(e.deltaY) / 200), 1),
        15
      )

      if (newZoom !== zoom) {
        setZoom(Math.round(newZoom * 100) / 100)
        setEvent('zoom')
      }
    }}
    $ref={canvasRef}
  />
}

// function useZoom () {
//   const [zoom, setZoom] = setState(1)
// }
