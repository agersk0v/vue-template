<script>
export default {
  data() {
    return {
      count: 0,
      newTask: '',
      nextId: 4,
      filter: 'All',
      tasks: [
        { id: 1, title: 'Explore your new Vue playground', done: true },
        { id: 2, title: 'Make this template your own', done: false },
        { id: 3, title: 'Build something wonderful', done: false },
      ],
    }
  },
  computed: {
    completedCount() { return this.tasks.filter(task => task.done).length },
    filteredTasks() {
      return this.tasks.filter(task => this.filter === 'All' || (this.filter === 'Done' ? task.done : !task.done))
    },
    progress() { return this.tasks.length ? Math.round(this.completedCount / this.tasks.length * 100) : 0 },
  },
  methods: {
    addTask() {
      const title = this.newTask.trim()
      if (!title) return
      this.tasks.push({ id: this.nextId++, title, done: false })
      this.newTask = ''
      this.filter = 'All'
    },
    removeTask(id) { this.tasks = this.tasks.filter(task => task.id !== id) },
  },
}
</script>

<template>
  <div class="site-shell">
    <header>
      <a class="brand" href="#"><span class="brand-mark">v.</span>vue atelier<span class="brand-caption">/ starter</span></a>
      <a class="text-link" href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener noreferrer">Vue documentation <span aria-hidden="true">↗</span></a>
    </header>

    <main>
      <section class="hero">
        <div class="eyebrow"><span class="status-dot"></span> YOUR NEXT IDEA STARTS HERE</div>
        <h1>A little structure.<br />A lot of <span>possibility.</span></h1>
        <p>A fresh canvas for your next project. Simple, reactive, and ready<br class="desktop-break" /> to become whatever you have in mind.</p>
        <div class="hero-links"><a class="primary-button" href="#playground">Explore the playground <span aria-hidden="true">↗</span></a><span class="version-tag">Vue 3 + Vite</span></div>
        <div class="hero-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="vue-symbol">V</div><span class="art-label">made to be made yours</span><span class="spark">✳</span></div>
      </section>

      <section id="playground" class="playground">
        <div class="section-heading"><div><div class="eyebrow">LEARN BY DOING</div><h2>A reactive little playground</h2></div><span class="section-note">Change something. See what happens.</span></div>
        <div class="example-grid">
          <article class="card task-card">
            <div class="card-heading"><span class="icon-box">✓</span><span class="code-label">01 / lists & bindings</span></div>
            <h3>Small steps, big ideas.</h3><p class="card-description">A tiny task list to get things moving.</p>
            <form class="task-form" @submit.prevent="addTask"><label class="sr-only" for="new-task">New task</label><input id="new-task" v-model="newTask" maxlength="160" placeholder="What's your next step?" autocomplete="off" /><button class="add-button" type="submit" :disabled="!newTask.trim()" aria-label="Add task">+</button></form>
            <div class="filter-row" aria-label="Filter tasks"><button v-for="option in ['All', 'Active', 'Done']" :key="option" :class="{ selected: filter === option }" :aria-pressed="filter === option" @click="filter = option">{{ option }}</button><span>{{ tasks.length }} tasks</span></div>
            <ul class="task-list"><li v-for="task in filteredTasks" :key="task.id"><label :class="{ completed: task.done }"><input v-model="task.done" type="checkbox" /><span>{{ task.title }}</span></label><button class="remove-button" :aria-label="`Remove ${task.title}`" @click="removeTask(task.id)">×</button></li></ul>
            <p v-if="!filteredTasks.length" class="empty-state">{{ tasks.length ? 'No tasks in this view.' : 'A clean slate. Add your first task above.' }}</p>
            <div class="progress-caption"><span>{{ completedCount }} of {{ tasks.length }} complete</span><span>{{ progress }}%</span></div><div class="progress-track" role="progressbar" aria-label="Tasks completed" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"><div :style="{ width: progress + '%' }"></div></div>
          </article>

          <article class="card counter-card"><div class="card-heading"><span class="icon-box">↗</span><span class="code-label">02 / state & events</span></div><h3>Every click counts.</h3><p class="card-description">Meet reactivity. No page reload required.</p><div class="counter-value" aria-live="polite" aria-atomic="true">{{ count }}</div><div class="counter-controls"><button aria-label="Decrease count" @click="count--">−</button><span>give it a click</span><button aria-label="Increase count" @click="count++">+</button></div><button class="reset-button" @click="count = 0">↺ Reset counter</button><div class="code-preview"><span class="code-comment">// state changes. the view follows.</span><br /><span class="code-purple">this</span>.count <span class="code-green">+=</span> 1</div></article>
        </div>
      </section>

      <section class="features" aria-label="Template features"><div><span class="feature-number">01</span><h3>Easy to understand</h3><p>Clear components and familiar HTML.<br />Start small, grow at your own pace.</p></div><div><span class="feature-number">02</span><h3>Instant feedback</h3><p>Vite keeps your development fast.<br />Save a change and see it come alive.</p></div><div><span class="feature-number">03</span><h3>Yours to build on</h3><p>No unnecessary dependencies.<br />Just a good place to begin.</p></div></section>
    </main>
    <footer><span><span class="footer-mark">v.</span> A starting point, not a finish line.</span><a href="https://github.com/MartinKierkegaard/Vue3-Template" target="_blank" rel="noopener noreferrer">Inspired by Vue3-Template ↗</a></footer>
  </div>
</template>
