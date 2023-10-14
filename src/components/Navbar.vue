<script lang="ts" setup>
</script>

<template>
  <div class="navbar bg-base-100 mb-10">
    <router-link class="flex-1 text-3xl font-bold text-zinc-700" to="/">EchoNook</router-link
    >
    <div class="flex-none gap-2">
      <div class="form-control">
        <input type="text" placeholder="Search" class="input input-bordered w-[300px]" />
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
        </label>
        <ul
          tabindex="0"
          class="mt-3 z-20 bg-white p-2 shadow menu menu-sm dropdown-content rounded-md w-52"
        >
          <li>
            <button class="btn btn-ghost btn-sm justify-start capitalize">
              Cuenta
            </button>
          </li>
          <li>
            <button class="btn btn-ghost btn-sm justify-start capitalize">
              Publicaciones
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
