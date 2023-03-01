<template>
  <div class="container">
    <video ref="inputVideo"></video>
    <canvas ref="outputCanvas" width="500" height="500"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';

const inputVideo = ref();
const outputCanvas = ref();

nextTick(() => {
  init();
});

function init() {
  const pose = new Pose({
    locateFile: (file) => {
      return `/poseFile/${file}`; // 加载本地文件
      // return `https://192.168.31.149:8080/${file}`;
      // return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }
  });
  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    smoothSegmentation: false,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  pose.onResults(function (results) {
    if (!results.poseLandmarks) return;

    const canvasCtx = outputCanvas.value.getContext('2d');

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, outputCanvas.value.width, outputCanvas.value.height);
    // canvasCtx.drawImage(results.poseLandmarks, 0, 0,
    //                     canvasElement.width, canvasElement.height);

    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = 'source-in';
    canvasCtx.fillStyle = '#00FF00';
    canvasCtx.fillRect(0, 0, outputCanvas.value.width, outputCanvas.value.height);

    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop';
    canvasCtx.drawImage(results.image, 0, 0, outputCanvas.value.width, outputCanvas.value.height);

    canvasCtx.globalCompositeOperation = 'source-over';
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: '#00FF00',
      lineWidth: 4
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#FF0000', lineWidth: 2 });
    canvasCtx.restore();
  });

  const camera = new Camera(inputVideo.value, {
    onFrame: async () => {
      await pose.send({ image: inputVideo.value });
    },
    width: 500,
    height: 500
  });
  camera.start();
}
</script>
