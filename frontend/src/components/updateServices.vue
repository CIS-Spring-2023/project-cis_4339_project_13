<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { DateTime } from 'luxon'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  props: ['id'],
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      clientAttendees: [],
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
        description: '',
        attendees: []
      }
    }
  },
  created() {
    axios.get(`${apiURL}/events/id/${this.$route.params.id}`).then((res) => {
      this.event = res.data
      this.event.date = this.formattedDate(this.event.date)
      this.event.attendees.forEach((e) => {
        axios.get(`${apiURL}/clients/id/${e}`).then((res) => {
          this.clientAttendees.push(res.data)
        })
      })
    })
  },
  methods: {
    // better formatted date, converts UTC to local time
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toISODate()
    },
    handleEventUpdate() {
      axios.put(`${apiURL}/events/update/${this.id}`, this.event).then(() => {
        alert('Update has been saved.')
        this.$router.back()
      })
    },
    editClient(clientID) {
      this.$router.push({ name: 'updateclient', params: { id: clientID } })
    },
    eventDelete() {
      axios.delete(`${apiURL}/events/${this.id}`).then(() => {
        alert('Event has been deleted.')
        this.$router.push({ name: 'findevents' })
      })
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

          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Status</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="event.date"
              />
              <span class="text-black" v-if="v$.event.date.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.event.date.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>

          <div></div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <!-- added missing v-model connection -->
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                v-model="event.description"
              ></textarea>
            </label>
          </div>

          <div></div>
          <div></div>
          <div></div>
          <!-- form field -->
          </div>

        <!-- grid container -->

        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="handleEventUpdate"
              type="submit"
              class="bg-green-700 text-white rounded"
            >
              Update Service
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="eventDelete"
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
