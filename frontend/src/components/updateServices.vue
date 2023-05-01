<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { toHandlers } from 'vue'
const apiURL = import.meta.env.VITE_ROOT_API
import { store } from '../store'

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      store,
      org: {},
      service: {
        name: '',
        description: '',
        active: ''
      }
      }
  },

  methods: {
    async getData() {
      axios.get(`${apiURL}/services/${this.$route.params.id}`).then((res) => {
      this.service = res.data[0]
    })
    },
    handleServiceUpdate() {
      axios
        .put(`${apiURL}/services/update/${this.service.id}`, this.service)
        .then(() => {
          alert('Service has been updated.')
          this.$router.back()
        })
    },
    handleServiceDelete() {
      axios.delete(`${apiURL}/services/${this.service.id}`).then(() => {
        alert('Service has been deleted.')
        this.$router.push({ name: 'findservices' })
      })
    }
  },
  created() {
    if(this.store.role != 'editor') {
      this.$router.push('/login')
    }

    this.getData()
  }, 
  validations() {
    return {
      service: {
        name: { required },
        description: { required }
      }
    }
  }
}
</script>
<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Update or Delete Service
      </h1>
    </div>
    <div class="px-10 py-20">
      <form @submit.prevent="handleSubmitForm">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Service Details</h2>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.name"
              />
              <span class="text-black" v-if="v$.service.name.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.service.name.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>
          <!-- form field -->
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <!-- added missing v-model connection -->
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                v-model="service.description"
              >{{ service.description }}</textarea>
            </label>
          </div>
          <div>
            <label for="active" class="inline-flex items-center">
              <input
                type="checkbox"
                id="serviceactive"
                value="Active"
                v-model="service.active"
                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                :notchecked="service.active"
              />
              <span class="ml-2">Active</span>
            </label>
          </div>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div></div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="handleServiceUpdate"
              type="submit"
              class="bg-green-700 text-white rounded"
            >
              Update Service
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="handleServiceDelete"
              type="submit"
              class="bg-red-700 text-white rounded"
            >
              Delete Service
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              type="reset"
              class="border border-red-700 bg-white text-red-700 rounded"
              @click="$router.back()"
            >
              Go back
            </button>
          </div>
        </div>

        <hr class="mt-10 mb-10" />
      </form>
    </div>
  </main>
</template>
