<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { store } from '../store';

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      store,
      services: {
        name: '',
        description: '',
        active: ''
      }
    }
  },
  
  methods: {
    //This section should allow us to click on the service and it will take us to the update and delete page
    async handleSubmitForm() {
      let endpoint = ''
      if (this.searchBy === 'Service Name') {
        endpoint = `services/search/?name=${this.name}&searchBy=name`
      } else if (this.searchBy === 'service name') {
        endpoint = `services/search/?servicesName=${this.serviceName}&searchBy=name`
      }
      axios.get(`${apiURL}/${endpoint}`).then((res) => {
        this.services = res.data
      })
    },
    // abstracted method to get services
    getServices() {
      axios.get(`${apiURL}/services`).then((res) => {
        this.services = res.data
        console.log(this.services)
      })
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.name = ''

      this.getServices()
    },
    editServices(serviceName) {
      this.$router.push(`/updateServices/${serviceName}`)
    }
  },
  created() {
    if(!this.store.isAuth) {
      this.$router.push('/login')
    }
    this.getServices()
  },
  // sets validations for the various data properties
  validations() {
    return {
      services: {
        name: { required }
      }
    }
  }
}
</script>
<template>
  <main>
    <!--UPDATE SERVICES need to add a select services which will pull from the current services and the implement the changes-->
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Search for Services
      </h1>
    </div>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="handleSubmitForm">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Search for Sevices</h2>
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Search by Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="services.name"
              />
              <span class="text-black" v-if="v$.services.name.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.services.name.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
              <div class="flex justify-between mt-10 mr-20">
                <router-link to="/createServices">
                  <button class="bg-red-700 text-white rounded" type="submit">
                    Create New Service
                  </button>
                </router-link>
              </div>
            </label>
          </div>
        </div>
      </form>
    </div>
    <!--END-->

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Services</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Name</th>
              <th class="p-4 text-left">Description</th>
              <th class="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="editServices(service._id)"
              v-for="service in this.services"
              :key="service._id"
            >
              <td class="p-2 text-left">
                {{ service.name }}
              </td>
              <td class="p-2 text-left">
                {{ service.description }}
              </td>
              <td class="p-2 text-left">{{ service.active }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!--UPDATE SERVICES need to add a select services which will pull from the current services and the implement the changes-->
  </main>
</template>
