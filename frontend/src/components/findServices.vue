<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      services: {
        name: '',
        description: '',
        status: ''
      }
    }
  },
  methods: { //This section should allow us to click on the service and it will take us to the update and delete page 
    ahandleSubmitForm() {
      let endpoint = ''
      if (this.searchBy === 'Event Name') {
        endpoint = `events/search/?name=${this.name}&searchBy=name`
      } else if (this.searchBy === 'Event Date') {
        endpoint = `events/search/?eventDate=${this.eventDate}&searchBy=date`
      }
      axios.get(`${apiURL}/${endpoint}`).then((res) => {
        this.events = res.data
      })
    },
    // abstracted method to get events
    getEvents() {
      axios.get(`${apiURL}/events`).then((res) => {
        this.events = res.data
      })
      window.scrollTo(0, 0)
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.name = ''
      this.eventDate = ''

      this.getEvents()
    },
    editEvent(eventID) {
      this.$router.push({ name: 'eventdetails', params: { id: eventID } })
    }
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
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
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
            </label>
          </div>

       
        </div>
    </form>
    </div> <!--END-->


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
              @click="editClient(client._id)"
              v-for="client in queryData"
              :key="client._id"
            >
              <td class="p-2 text-left">
                {{ client.firstName + ' ' + client.lastName }}
              </td>
              <td class="p-2 text-left">
                {{ client.phoneNumber.primary }}
              </td>
              <td class="p-2 text-left">{{ client.address.city }}</td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-between mt-10 mr-20">
          <router-link to="/createServices">
          <button class="bg-red-700 text-white rounded" type="submit">
            Create New Service
          </button>
        </router-link>
        </div>
      </div>
    </div>

<!--UPDATE SERVICES need to add a select services which will pull from the current services and the implement the changes-->
  </main>
</template>