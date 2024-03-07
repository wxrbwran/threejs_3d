<script setup lang="ts">
import Lesson1 from "@/components/Lession1.vue";
import Lesson2 from "@/components/Lession2.vue";
import First3D from "@/components/First3D.vue";
import Light from "@/components/Light.vue";
import OrbitControls from "@/components/OrbitControls.vue";
import ZhenLie from "@/components/ZhenLie.vue";
import MeshPhong from "@/components/MeshPhong.vue";
import Antilias from "@/components/Antilias.vue";
import PointsModel from "@/components/PointsModel.vue";
import Group from "@/components/Group.vue";
import Texture from "@/components/Texture.vue";
import GLTF from "@/components/GLTFL.vue";
</script>

<template>
  <GLTF></GLTF>
</template>

<style>
#app {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
