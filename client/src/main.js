/**
 * Vue 3 Application Entry Point
 *
 * Creates the root Vue instance, registers Tailwind styles,
 * and mounts the App component.
 */

import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

const app = createApp(App);
app.mount('#app');