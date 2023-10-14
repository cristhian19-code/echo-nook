<script lang="ts" setup></script>

<template>
  <div
    @click="$router.push('/publicacion/4')"
    class="card rounded-md border cursor-pointer border-zinc-800 w-96 transition-all duration-150 ease-in hover:-translate-x-1 hover:-translate-y-1"
  >
    <figure>
      <!-- class="hover:scale-105 transition-transform duration-300 ease-in" -->
      <img
        src="https://images.pexels.com/photos/23547/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Shoes"
      />
    </figure>
    <div class="card-body">
      <div class="card-title">
        <p>Shoes!</p>
        <div class="badge bg-zinc-700 text-white">NEW</div>
      </div>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">Fashion</div>
        <div class="badge badge-outline">Products</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card:hover {
  box-shadow: 0.3rem 0.3rem rgb(37, 37, 37);
}
</style>
