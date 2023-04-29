<template>
    <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <li>
              <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >dashboard</span
                >
                Dashboard
              </router-link>
            </li>
            <li v-if="isLoggedIn">
              <router-link to="/intakeform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >people</span
                >
                Client Intake Form
              </router-link>
            </li>
            <li v-if="this.show">
              <router-link to="/eventform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                Create Event
              </router-link>
            </li>
            <li v-if="this.role === 'editor'">
              <router-link to="/createservices" >
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Create Services
              </router-link>
            </li>
            <li v-if="store.role === 'viewer' || this.role === 'editor'">
              <router-link to="/findclient">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Client
              </router-link>
            </li>
            <li v-if="this.role === 'viewer' || this.role === 'editor'">
              <router-link to="/findevents">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Event
              </router-link>
            </li>
          </ul>
        </nav>
</template>
<script>
    import {store} from './store'

    export default {
  name: 'App',
  data() {
    return {
      store,
      email: "",
      role: "",
      orgName: 'Dataplatform',
      show: false
    }
  },
  methods: {
    signout() {
      store.auth_status = "Login"
      store.role = ""
      this.show = false
    }
  },
}
</script>