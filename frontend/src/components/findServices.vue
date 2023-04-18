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
      event: {
        name: '',
        services: [],
        date: '',
        address: {
          line1: '',
          line2: '',
          city: '',
          county: '',
          zip: ''
        },
        description: ''
      }
    }
  },
  methods: {
    async handleSubmitForm() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        axios
          .post(`${apiURL}/events`, this.event)
          .then(() => {
            alert('Service has been added.')
            this.$router.push({ name: 'findevents' })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      event: {
        name: { required },
        date: { required }
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
                v-model="event.name"
              />
              <span class="text-black" v-if="v$.event.name.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.event.name.$errors"
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
          <button class="bg-red-700 text-white rounded" type="submit">
            Create New Service
          </button>
          <button class="bg-red-700 text-white rounded" type="submit">
            Update Service
          </button>
          <button class="bg-red-700 text-white rounded" type="submit">
            Delete Service
          </button>
        </div>
      </div>
    </div>

<!--UPDATE SERVICES need to add a select services which will pull from the current services and the implement the changes-->
  </main>
</template>