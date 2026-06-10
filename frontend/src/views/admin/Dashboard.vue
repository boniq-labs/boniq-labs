<template>
  <div class="container max-w-7xl mx-auto min-h-screen px-4 py-8">
    <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl md:p-8">
      <div class="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            Admin Control Center
          </div>
          <h1 class="text-3xl font-display font-extrabold text-white md:text-4xl">Manage content, traffic, and inbox from one place</h1>
          <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-400 md:text-base">
            The dashboard now exposes the controls your project already supports, so we can manage the portfolio without changing the public-facing behavior.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <button
            type="button"
            @click="refreshDashboard"
            class="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/10 hover:text-white hover:shadow-cyan-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h5M20 20v-5h-5M5.636 18.364A9 9 0 103.34 9.34M18.364 5.636A9 9 0 0120.66 14.66" />
            </svg>
            Refresh
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-white/10 hover:text-white hover:shadow-emerald-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
          </a>
          <button
            type="button"
            @click="logout"
            class="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:text-white hover:shadow-red-500/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="card in statsCards"
          :key="card.label"
          class="group relative overflow-hidden rounded-3xl border p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/30"
          :class="card.className"
        >
          <div class="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-2">
              <span v-html="card.icon" class="text-lg"></span>
              <div class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{{ card.label }}</div>
            </div>
            <div class="mt-3 flex items-end justify-between gap-4">
              <div class="text-4xl font-black text-white transition duration-300 group-hover:scale-105">{{ card.value }}</div>
              <div class="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold text-slate-300 backdrop-blur-sm">{{ card.note }}</div>
            </div>
          </div>
        </div>
      </div>

      <Teleport to="body">
        <div
          v-if="feedback.text"
          class="fixed bottom-6 right-6 z-[9999] flex animate-scale-in items-start gap-3 rounded-2xl border px-5 py-4 text-sm shadow-2xl backdrop-blur-2xl"
          :class="feedback.type === 'error'
            ? 'border-red-500/30 bg-red-500/20 text-red-200 shadow-red-500/20'
            : 'border-emerald-500/30 bg-emerald-500/20 text-emerald-200 shadow-emerald-500/20'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="feedback.type === 'error'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <div class="leading-6 font-semibold pr-4">{{ feedback.text }}</div>
          <button @click="feedback.text = ''" class="absolute right-3 top-3 text-white/40 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </Teleport>
    </div>

    <div class="mt-8 flex flex-col gap-8 xl:flex-row">
      <aside class="xl:w-72 xl:flex-shrink-0">
        <div class="sticky top-8 rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl">
          <div class="space-y-2">
            <button
              v-for="tab in tabs"
              :key="tab.label"
              type="button"
              @click="setActiveTab(tab.label)"
              class="group flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-300"
              :class="activeTab === tab.label
                ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-[0_12px_30px_rgba(59,130,246,0.25)] scale-[1.02]'
                : 'text-slate-300 hover:bg-white/10 hover:text-white hover:scale-[1.01]'"
            >
              <span class="flex items-center gap-3">
                <span v-html="tab.icon" class="text-base"></span>
                <span>{{ tab.label }}</span>
              </span>
              <span class="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-bold backdrop-blur-sm" :class="tab.label === 'Inbox' && tab.count > 0 ? 'border-amber-400/30 bg-amber-400/10 text-amber-200' : ''">{{ tab.count }}</span>
            </button>
          </div>

          <div class="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4">
            <div class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Needs attention</div>
            <div v-if="attentionItems.length === 0" class="mt-3 text-sm text-emerald-300">Everything essential is configured.</div>
            <div v-else class="mt-3 space-y-3">
              <button
                v-for="item in attentionItems"
                :key="item.label"
                type="button"
                @click="setActiveTab(item.tab)"
                class="block w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-left text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <div class="font-semibold text-white">{{ item.label }}</div>
                <div class="mt-1 text-xs leading-5 text-slate-400">{{ item.description }}</div>
              </button>
            </div>
          </div>

          <div class="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4">
            <div class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Session</div>
            <div class="mt-3 text-sm text-slate-300">
              <div class="font-semibold text-white">{{ authStore.user?.name || 'Administrator' }}</div>
              <div class="mt-1 break-all text-xs text-slate-500">{{ authStore.user?.email || 'Signed in user' }}</div>
              <div class="mt-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">
                Last sync: <span class="font-semibold text-slate-200">{{ lastSyncLabel }}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div class="flex-1">
        <div v-if="loading.dashboard" class="rounded-[2rem] border border-white/10 bg-white/5 p-12 backdrop-blur-2xl">
          <div class="flex flex-col items-center justify-center gap-6">
            <div class="relative">
              <div class="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
              <div class="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-primary/10"></div>
            </div>
            <p class="text-sm text-slate-400 animate-pulse">Loading the latest dashboard data...</p>
            <div class="flex gap-3">
              <div class="h-3 w-20 animate-shimmer rounded-full"></div>
              <div class="h-3 w-32 animate-shimmer rounded-full" style="animation-delay: 0.2s"></div>
              <div class="h-3 w-24 animate-shimmer rounded-full" style="animation-delay: 0.4s"></div>
            </div>
          </div>
        </div>

        <div v-else class="space-y-8">
          <Transition name="tab" mode="out-in">
            <section v-if="activeTab === 'Overview'" key="Overview" class="space-y-8">
            <div class="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
              <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div class="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div class="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">Workspace status</div>
                    <h2 class="mt-3 text-2xl font-bold text-white">Operational summary</h2>
                    <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                      Profile completion, inbound communication, and content inventory are now visible at a glance.
                    </p>
                  </div>
                  <div class="rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-right">
                    <div class="text-xs uppercase tracking-[0.24em] text-slate-500">Profile completion</div>
                    <div class="mt-2 text-3xl font-black text-white">{{ profileCompletion }}%</div>
                  </div>
                </div>

                <div class="mt-6 h-3 overflow-hidden rounded-full bg-black/30">
                  <div class="h-full rounded-full bg-gradient-to-r from-primary via-blue-500 to-cyan-400 transition-all duration-700" :style="{ width: `${profileCompletion}%` }"></div>
                </div>

                <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <button type="button" @click="setActiveTab('Profile')" class="group rounded-3xl border border-white/10 bg-black/20 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-500/30 hover:bg-sky-500/10 hover:shadow-lg hover:shadow-sky-500/10">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-sky-400 transition duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      <div class="text-xs uppercase tracking-[0.24em] text-slate-400">Profile</div>
                    </div>
                    <div class="mt-3 text-lg font-bold text-white transition duration-300 group-hover:text-sky-200">{{ completedProfileFields }}/{{ profileChecklist.length }} fields complete</div>
                    <div class="mt-1 text-sm text-slate-400">Update bio, links, avatar, and CV.</div>
                  </button>
                  <button type="button" @click="setActiveTab('Projects')" class="group rounded-3xl border border-white/10 bg-black/20 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/10">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-cyan-400 transition duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                      <div class="text-xs uppercase tracking-[0.24em] text-slate-400">Projects</div>
                    </div>
                    <div class="mt-3 text-lg font-bold text-white transition duration-300 group-hover:text-cyan-200">{{ projects.length }} active items</div>
                    <div class="mt-1 text-sm text-slate-400">Titles, links, images, and technology stacks.</div>
                  </button>
                  <button type="button" @click="setActiveTab('Skills')" class="group rounded-3xl border border-white/10 bg-black/20 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-violet-500/10 hover:shadow-lg hover:shadow-violet-500/10">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-violet-400 transition duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                      <div class="text-xs uppercase tracking-[0.24em] text-slate-400">Skills</div>
                    </div>
                    <div class="mt-3 text-lg font-bold text-white transition duration-300 group-hover:text-violet-200">{{ skills.length }} tracked skills</div>
                    <div class="mt-1 text-sm text-slate-400">Category, icon, and level are manageable now.</div>
                  </button>
                  <button type="button" @click="setActiveTab('Inbox')" class="group rounded-3xl border border-white/10 bg-black/20 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500/30 hover:bg-amber-500/10 hover:shadow-lg hover:shadow-amber-500/10">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-400 transition duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      <div class="text-xs uppercase tracking-[0.24em] text-slate-400">Inbox</div>
                    </div>
                    <div class="mt-3 text-lg font-bold text-white transition duration-300 group-hover:text-amber-200">{{ unreadMessages.length }} unread messages</div>
                    <div class="mt-1 text-sm text-slate-400">Read state and deletion are both available.</div>
                  </button>
                </div>
              </div>

              <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-300">Quick actions</div>
                    <h3 class="mt-3 text-xl font-bold text-white">Jump straight into work</h3>
                  </div>
                </div>

                <div class="mt-6 space-y-3">
                  <button type="button" @click="setActiveTab('Profile')" class="group w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-500/30 hover:bg-sky-500/10 hover:text-white"><span class="transition-all duration-300 group-hover:ml-1">✏️ Edit portfolio profile</span></button>
                  <button type="button" @click="setActiveTab('Projects')" class="group w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-white"><span class="transition-all duration-300 group-hover:ml-1">📦 Create or update projects</span></button>
                  <button type="button" @click="setActiveTab('Skills')" class="group w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white"><span class="transition-all duration-300 group-hover:ml-1">⚡ Manage skill levels</span></button>
                  <button type="button" @click="setActiveTab('Inbox')" class="group w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-white"><span class="transition-all duration-300 group-hover:ml-1">💬 Review inbox</span></button>
                  <button type="button" @click="setActiveTab('Settings')" class="group w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white"><span class="transition-all duration-300 group-hover:ml-1">⚙️ Open maintenance settings</span></button>
                </div>

                <div class="mt-6 rounded-3xl border border-sky-400/20 bg-sky-400/10 p-4 text-sm text-sky-100">
                  Uploads are now admin-only, and inbox actions map to real backend routes.
                </div>
              </div>
            </div>

            <div class="grid gap-8 lg:grid-cols-2">
              <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <div class="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300">Recent inbox</div>
                    <h3 class="mt-3 text-xl font-bold text-white">Latest messages</h3>
                  </div>
                  <button type="button" @click="setActiveTab('Inbox')" class="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 transition-all duration-300 hover:border-amber-400/30 hover:bg-amber-400/10 hover:text-amber-200">
                    Open inbox →
                  </button>
                </div>

                <div v-if="messages.length === 0" class="mt-6 rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-sm text-slate-400">
                  No messages have been received yet.
                </div>
                <div v-else class="mt-6 space-y-4">
                  <div v-for="message in messages.slice(0, 3)" :key="message._id" class="group rounded-3xl border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/5 hover:shadow-xl hover:shadow-black/30">
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-3">
                          <div v-if="!message.isRead" class="h-2 w-2 flex-shrink-0 rounded-full bg-amber-400"></div>
                          <div class="text-lg font-bold text-white truncate">{{ message.subject }}</div>
                        </div>
                        <div class="mt-1 flex items-center gap-3 text-sm text-slate-300">
                          <span>{{ message.name }}</span>
                          <span class="text-slate-500">·</span>
                          <a :href="`mailto:${message.email}`" class="text-sky-300 hover:underline truncate">{{ message.email }}</a>
                        </div>
                      </div>
                      <span class="flex-shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 group-hover:scale-105" :class="message.isRead ? 'border-white/10 bg-white/5 text-slate-400' : 'border-amber-400/30 bg-amber-400/10 text-amber-200'">
                        {{ message.isRead ? 'Read' : 'Unread' }}
                      </span>
                    </div>
                    <p class="mt-4 line-clamp-3 text-sm leading-6 text-slate-400 group-hover:text-slate-300 transition-colors">{{ message.content }}</p>
                  </div>
                </div>
              </div>

              <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <div class="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Content inventory</div>
                    <h3 class="mt-3 text-xl font-bold text-white">Recently updated content</h3>
                  </div>
                  <div class="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-slate-400">{{ projects.length + skills.length }} total</div>
                </div>

                <div class="mt-6 grid gap-4">
                  <div class="group rounded-3xl border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/5">
                    <div class="flex items-center justify-between gap-4">
                      <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        <div class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Projects</div>
                      </div>
                      <button type="button" @click="setActiveTab('Projects')" class="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300 transition hover:text-white">Manage →</button>
                    </div>
                    <div v-if="projects.length === 0" class="mt-4 text-sm text-slate-400">No projects available yet.</div>
                    <div v-else class="mt-4 space-y-3">
                      <div v-for="project in recentProjects" :key="project._id" class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:pl-5">
                        <div class="font-semibold text-white">{{ project.title }}</div>
                        <div class="mt-1 text-xs text-slate-500">{{ formatDate(project.updatedAt || project.createdAt) }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="group rounded-3xl border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/20 hover:shadow-lg hover:shadow-violet-500/5">
                    <div class="flex items-center justify-between gap-4">
                      <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        <div class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Skills</div>
                      </div>
                      <button type="button" @click="setActiveTab('Skills')" class="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300 transition hover:text-white">Manage →</button>
                    </div>
                    <div v-if="skills.length === 0" class="mt-4 text-sm text-slate-400">No skills available yet.</div>
                    <div v-else class="mt-4 space-y-3">
                      <div v-for="skill in recentSkills" :key="skill._id" class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:pl-5">
                        <div class="flex items-center justify-between gap-4">
                          <div class="font-semibold text-white">{{ skill.name }}</div>
                          <div class="flex items-center gap-2">
                            <div class="h-1.5 w-16 overflow-hidden rounded-full bg-black/30">
                              <div class="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" :style="{ width: `${skill.level}%` }"></div>
                            </div>
                            <div class="text-sm font-bold text-sky-300">{{ skill.level }}%</div>
                          </div>
                        </div>
                        <div class="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{{ skill.category }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section v-else-if="activeTab === 'Profile'" key="Profile">
            <div class="grid gap-8 xl:grid-cols-[1.35fr_0.75fr]">
              <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div class="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">Profile editor</div>
                    <h2 class="mt-3 text-2xl font-bold text-white">Public identity and contact details</h2>
                    <p class="mt-2 text-sm leading-6 text-slate-400">
                      This section controls the hero copy, biography, social links, CV URL, and avatar shown across the site.
                    </p>
                  </div>
                  <div class="rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-right">
                    <div class="text-xs uppercase tracking-[0.24em] text-slate-500">Completion</div>
                    <div class="mt-2 text-3xl font-black text-white">{{ profileCompletion }}%</div>
                  </div>
                </div>

                <form @submit.prevent="saveProfile" class="mt-8 space-y-8">
                  <div class="grid gap-6 md:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-semibold text-slate-300">Display name</label>
                      <input v-model="profileData.name" required class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-semibold text-slate-300">Role or title</label>
                      <input v-model="profileData.role" required class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-semibold text-slate-300">Greeting</label>
                      <input v-model="profileData.greeting" placeholder="Hi, I'm" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-semibold text-slate-300">CV URL</label>
                      <div class="flex gap-3">
                        <input v-model="profileData.cvUrl" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
                        <label class="relative inline-flex cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                          <input type="file" accept=".pdf,.doc,.docx" class="absolute inset-0 cursor-pointer opacity-0" @change="handleFileUpload($event, 'cv')" />
                          <span v-if="uploading.cv" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                          <span v-else>Upload</span>
                        </label>
                      </div>
                    </div>
                    <div class="md:col-span-2">
                      <label class="mb-2 block text-sm font-semibold text-slate-300">Biography</label>
                      <textarea v-model="profileData.bio" rows="5" class="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
                    </div>
                  </div>

                  <div class="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
                    <div class="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div class="text-sm font-semibold text-white">Avatar asset</div>
                      <div class="mt-4 flex flex-col items-center gap-4">
                        <div class="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-primary/50 bg-black/30">
                          <img v-if="profileData.avatarUrl" :src="profileData.avatarUrl" alt="Avatar preview" class="h-full w-full object-cover" />
                          <span v-else class="text-3xl font-black text-white">{{ profileInitials }}</span>
                        </div>
                        <label class="relative flex w-full cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-4 text-center text-sm font-semibold text-slate-200 transition hover:border-primary/50 hover:bg-white/10">
                          <input type="file" accept="image/*" class="absolute inset-0 cursor-pointer opacity-0" @change="handleFileUpload($event, 'avatar')" />
                          <span v-if="uploading.avatar">Uploading avatar...</span>
                          <span v-else>Select avatar image</span>
                        </label>
                      </div>
                    </div>

                    <div class="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div class="text-sm font-semibold text-white">Social links</div>
                      <div class="mt-4 grid gap-4 md:grid-cols-3">
                        <div>
                          <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">WhatsApp</label>
                          <input v-model="profileData.whatsapp" placeholder="https://wa.me/..." class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
                        </div>
                        <div>
                          <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">LinkedIn</label>
                          <input v-model="profileData.linkedin" placeholder="https://linkedin.com/in/..." class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
                        </div>
                        <div>
                          <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Instagram</label>
                          <input v-model="profileData.instagram" placeholder="https://instagram.com/..." class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="text-sm text-slate-500">
                      Changes are saved directly to the live profile data used by the homepage and contact links.
                    </div>
                    <button
                      type="submit"
                      class="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(59,130,246,0.25)] transition hover:-translate-y-1"
                      :disabled="savingProfile"
                    >
                      <span v-if="savingProfile" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                      <span>{{ savingProfile ? 'Saving profile...' : 'Save profile' }}</span>
                    </button>
                  </div>
                </form>
              </div>

              <div class="space-y-8">
                <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                  <div class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Completion checklist</div>
                  <div class="mt-5 space-y-3">
                    <div
                      v-for="item in profileChecklist"
                      :key="item.label"
                      class="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                    >
                      <div class="text-sm font-semibold text-white">{{ item.label }}</div>
                      <span
                        class="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
                        :class="item.complete ? 'bg-emerald-500/15 text-emerald-200' : 'bg-amber-500/15 text-amber-200'"
                      >
                        {{ item.complete ? 'Complete' : 'Missing' }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                  <div class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Public preview impact</div>
                  <div class="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                    <p>The homepage hero uses your greeting, name, role, bio, avatar, and social links.</p>
                    <p>The contact and header navigation use the same profile record, so keeping it complete improves the whole site.</p>
                    <p>The CV URL can come from a manual link or an uploaded document file.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section v-else-if="activeTab === 'Projects'" key="Projects" class="space-y-8">
            <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Project editor</div>
                  <h2 class="mt-2 text-2xl font-bold text-white">{{ editingProject ? 'Update project' : 'Create project' }}</h2>
                  <p class="mt-2 text-sm leading-6 text-slate-400">
                    Technologies are editable here now, so the project filters on the public projects page stay accurate.
                  </p>
                </div>
                <div class="rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-right">
                  <div class="text-xs uppercase tracking-[0.24em] text-slate-500">Visible items</div>
                  <div class="mt-2 text-3xl font-black text-white">{{ projects.length }}</div>
                </div>
              </div>

              <form @submit.prevent="editingProject ? updateProject() : addProject()" class="mt-8 space-y-8">
                <div class="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <div class="grid gap-6 md:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-semibold text-slate-300">Project title</label>
                      <input v-model="projectForm.title" required class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-semibold text-slate-300">GitHub URL</label>
                      <input v-model="projectForm.githubLink" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                    </div>
                    <div class="md:col-span-2">
                      <label class="mb-2 block text-sm font-semibold text-slate-300">Description</label>
                      <textarea v-model="projectForm.description" required rows="4" class="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"></textarea>
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-semibold text-slate-300">Live demo URL</label>
                      <input v-model="projectForm.liveDemo" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-semibold text-slate-300">Technologies</label>
                      <input v-model="projectTechnologiesInput" placeholder="Vue, Express, MySQL" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                    </div>
                  </div>

                  <div class="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <label class="mb-2 block text-sm font-semibold text-slate-300">Project image</label>
                    <div class="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/20 bg-black/30">
                      <img v-if="projectForm.imageUrl" :src="projectForm.imageUrl" alt="Project preview" class="absolute inset-0 h-full w-full object-cover opacity-70" />
                      <div class="relative z-10 flex flex-col items-center gap-3 rounded-3xl bg-black/40 px-6 py-5 text-center backdrop-blur">
                        <div class="text-sm font-semibold text-white">{{ projectForm.imageUrl ? 'Replace image' : 'Upload preview image' }}</div>
                        <div class="text-xs text-slate-400">Recommended for project cards and featured previews.</div>
                        <label class="relative inline-flex cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                          <input type="file" accept="image/*" class="absolute inset-0 cursor-pointer opacity-0" @change="handleFileUpload($event, 'project')" />
                          <span v-if="uploading.project" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                          <span v-else>Select image</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-4">
                  <div class="text-sm text-slate-500">Technology tags are stored with each project and power the public filtering experience.</div>
                  <div class="flex flex-wrap gap-3">
                    <button v-if="editingProject" type="button" @click="resetProjectForm" class="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">Cancel edit</button>
                    <button type="submit" class="rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(14,165,233,0.25)] transition hover:-translate-y-1" :disabled="uploading.project">
                      {{ editingProject ? 'Save project changes' : 'Create project' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div class="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Project library</div>
                  <h3 class="mt-3 text-xl font-bold text-white">Manage existing items</h3>
                </div>
                <div class="w-full md:max-w-sm">
                  <input v-model="projectSearch" placeholder="Search projects, descriptions, or technologies" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
                </div>
              </div>

              <div v-if="filteredProjects.length === 0" class="mt-6 rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-sm text-slate-400">
                No projects match the current search.
              </div>
              <div v-else class="mt-6 grid gap-6 md:grid-cols-2">
                <div
                  v-for="project in filteredProjects"
                  :key="project._id"
                  class="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20"
                >
                  <div class="relative h-52 overflow-hidden bg-black/30">
                    <img v-if="project.imageUrl" :src="project.imageUrl" :alt="project.title" class="h-full w-full object-cover" />
                    <div v-else class="flex h-full items-center justify-center text-3xl font-black text-white/40">No image</div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div class="absolute bottom-4 left-4 right-4">
                      <div class="text-xl font-bold text-white">{{ project.title }}</div>
                    </div>
                  </div>
                  <div class="p-5">
                    <p class="text-sm leading-6 text-slate-400">{{ project.description }}</p>
                    <div class="mt-4 flex flex-wrap gap-2">
                      <span
                        v-for="tech in normalizeTechnologies(project.technologies)"
                        :key="`${project._id}-${tech}`"
                        class="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-200"
                      >
                        {{ tech }}
                      </span>
                    </div>
                    <div class="mt-5 flex flex-wrap gap-3">
                      <button type="button" @click="editProjectSetup(project)" class="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">Edit</button>
                      <button type="button" @click="deleteProject(project._id)" class="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-200 transition hover:bg-red-500 hover:text-white">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section v-else-if="activeTab === 'Skills'" key="Skills" class="space-y-8">
            <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Skill editor</div>
                  <h2 class="mt-2 text-2xl font-bold text-white">{{ editingSkill ? 'Update skill' : 'Create skill' }}</h2>
                  <p class="mt-2 text-sm leading-6 text-slate-400">
                    Skill percentage is now editable here, which keeps the public skills bars accurate.
                  </p>
                </div>
                <div class="rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-right">
                  <div class="text-xs uppercase tracking-[0.24em] text-slate-500">Tracked skills</div>
                  <div class="mt-2 text-3xl font-black text-white">{{ skills.length }}</div>
                </div>
              </div>

              <form @submit.prevent="editingSkill ? updateSkill() : addSkill()" class="mt-8 space-y-8">
                <div class="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <div class="grid gap-6 md:grid-cols-2">
                    <div>
                      <label class="mb-2 block text-sm font-semibold text-slate-300">Skill name</label>
                      <input v-model="skillForm.name" required placeholder="Vue.js" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400" />
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-semibold text-slate-300">Category</label>
                      <select v-model="skillForm.category" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400">
                        <option v-for="category in skillCategories.filter((item) => item !== 'All')" :key="category" :value="category">{{ category }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-semibold text-slate-300">Skill icon or emoji</label>
                      <div class="flex gap-3">
                        <input v-model="skillForm.icon" placeholder="Icon URL or emoji" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400" />
                        <label class="relative inline-flex cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                          <input type="file" accept="image/*" class="absolute inset-0 cursor-pointer opacity-0" @change="handleFileUpload($event, 'skill')" />
                          <span v-if="uploading.skill" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                          <span v-else>Upload</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label class="mb-2 block text-sm font-semibold text-slate-300">Skill level</label>
                      <div class="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                        <div class="flex items-center justify-between gap-4">
                          <input v-model.number="skillForm.level" type="range" min="1" max="100" class="w-full accent-cyan-400" />
                          <input v-model.number="skillForm.level" type="number" min="1" max="100" class="w-20 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-center text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div class="text-sm font-semibold text-white">Preview</div>
                    <div class="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
                      <div class="flex items-center gap-4">
                        <div class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/30 text-2xl font-bold text-white">
                          <img v-if="isImageValue(skillForm.icon)" :src="skillForm.icon" alt="Skill icon" class="h-10 w-10 object-contain" />
                          <span v-else>{{ skillForm.icon || 'S' }}</span>
                        </div>
                        <div>
                          <div class="text-lg font-bold text-white">{{ skillForm.name || 'Skill name' }}</div>
                          <div class="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{{ skillForm.category }}</div>
                        </div>
                      </div>
                      <div class="mt-5">
                        <div class="mb-2 flex items-center justify-between text-sm">
                          <span class="text-slate-400">Public skill bar</span>
                          <span class="font-bold text-cyan-300">{{ skillForm.level }}%</span>
                        </div>
                        <div class="h-3 overflow-hidden rounded-full bg-black/30">
                          <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500" :style="{ width: `${skillForm.level}%` }"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-4">
                  <div class="text-sm text-slate-500">Categories and levels sync with the public skills grouping and progress bars.</div>
                  <div class="flex flex-wrap gap-3">
                    <button v-if="editingSkill" type="button" @click="resetSkillForm" class="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">Cancel edit</button>
                    <button type="submit" class="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(34,211,238,0.2)] transition hover:-translate-y-1" :disabled="uploading.skill">
                      {{ editingSkill ? 'Save skill changes' : 'Create skill' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div class="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300">Skill library</div>
                  <h3 class="mt-3 text-xl font-bold text-white">Filter and manage skill records</h3>
                </div>
                <div class="grid gap-3 sm:grid-cols-2 lg:w-[30rem]">
                  <input v-model="skillSearch" placeholder="Search skills" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400" />
                  <select v-model="skillCategoryFilter" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400">
                    <option v-for="category in skillCategories" :key="category" :value="category">{{ category }}</option>
                  </select>
                </div>
              </div>

              <div v-if="filteredSkills.length === 0" class="mt-6 rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-sm text-slate-400">
                No skills match the current search or category filter.
              </div>
              <div v-else class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div
                  v-for="skill in filteredSkills"
                  :key="skill._id"
                  class="rounded-[1.75rem] border border-white/10 bg-black/20 p-5"
                >
                  <div class="flex items-start justify-between gap-4">
                    <div class="flex items-center gap-4">
                      <div class="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-2xl font-bold text-white">
                        <img v-if="isImageValue(skill.icon)" :src="skill.icon" alt="Skill icon" class="h-9 w-9 object-contain" />
                        <span v-else>{{ skill.icon || 'S' }}</span>
                      </div>
                      <div>
                        <div class="font-bold text-white">{{ skill.name }}</div>
                        <div class="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{{ skill.category }}</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="text-lg font-black text-cyan-300">{{ skill.level }}%</div>
                    </div>
                  </div>
                  <div class="mt-4 h-2 overflow-hidden rounded-full bg-black/30">
                    <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500" :style="{ width: `${skill.level || 0}%` }"></div>
                  </div>
                  <div class="mt-5 flex flex-wrap gap-3">
                    <button type="button" @click="editSkillSetup(skill)" class="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">Edit</button>
                    <button type="button" @click="deleteSkill(skill._id)" class="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-200 transition hover:bg-red-500 hover:text-white">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section v-else-if="activeTab === 'Inbox'" key="Inbox" class="space-y-8">
            <div class="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div class="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300">Inbox metrics</div>
                <h2 class="mt-3 text-2xl font-bold text-white">Message control</h2>
                <div class="mt-6 grid gap-4">
                  <div class="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div class="text-xs uppercase tracking-[0.18em] text-slate-500">Unread</div>
                    <div class="mt-2 text-4xl font-black text-white">{{ unreadMessages.length }}</div>
                  </div>
                  <div class="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div class="text-xs uppercase tracking-[0.18em] text-slate-500">Total inbox</div>
                    <div class="mt-2 text-4xl font-black text-white">{{ messages.length }}</div>
                  </div>
                  <div class="rounded-3xl border border-white/10 bg-black/20 p-5 text-sm leading-6 text-slate-400">
                    Messages can now be marked read or unread and can be deleted from the dashboard without dead API calls.
                  </div>
                </div>
              </div>

              <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Inbox queue</div>
                    <h3 class="mt-2 text-xl font-bold text-white">Review messages</h3>
                  </div>
                  <div class="flex flex-col gap-3 sm:flex-row">
                    <input v-model="messageSearch" placeholder="Search by sender, subject, or email" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400" />
                    <div class="flex rounded-2xl border border-white/10 bg-black/20 p-1">
                      <button
                        v-for="filter in messageFilters"
                        :key="filter"
                        type="button"
                        @click="messageFilter = filter"
                        class="rounded-2xl px-4 py-2 text-sm font-semibold transition"
                        :class="messageFilter === filter ? 'bg-amber-400/15 text-amber-200' : 'text-slate-400 hover:text-white'"
                      >
                        {{ filter }}
                      </button>
                    </div>
                  </div>
                </div>

                <div v-if="filteredMessages.length === 0" class="mt-6 rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-sm text-slate-400">
                  No messages match the current filter.
                </div>
                <div v-else class="mt-6 space-y-4">
                  <div
                    v-for="message in filteredMessages"
                    :key="message._id"
                    class="rounded-[1.75rem] border border-white/10 bg-black/20 p-5"
                  >
                    <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div class="min-w-0">
                        <div class="flex flex-wrap items-center gap-3">
                          <h4 class="text-lg font-bold text-white">{{ message.subject }}</h4>
                          <span
                            class="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
                            :class="message.isRead ? 'border-white/10 bg-white/5 text-slate-400' : 'border-amber-400/30 bg-amber-400/10 text-amber-200'"
                          >
                            {{ message.isRead ? 'Read' : 'Unread' }}
                          </span>
                        </div>
                        <div class="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                          <span>{{ message.name }}</span>
                          <span class="text-slate-600">/</span>
                          <a :href="`mailto:${message.email}`" class="text-sky-300 hover:underline">{{ message.email }}</a>
                          <span v-if="message.createdAt" class="text-slate-500">{{ formatDate(message.createdAt) }}</span>
                        </div>
                        <p class="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-400">{{ message.content }}</p>
                      </div>

                      <div class="flex flex-wrap gap-3">
                        <button
                          type="button"
                          @click="markMessageStatus(message, !message.isRead)"
                          class="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
                        >
                          {{ message.isRead ? 'Mark unread' : 'Mark read' }}
                        </button>
                        <button
                          type="button"
                          @click="deleteMessage(message._id)"
                          class="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-200 transition hover:bg-red-500 hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section v-else-if="activeTab === 'Settings'" key="Settings" class="space-y-8">
            <div class="grid gap-8 lg:grid-cols-2">
              <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Navigation controls</div>
                <h2 class="mt-2 text-2xl font-bold text-white">Open any management area quickly</h2>
                <div class="mt-6 grid gap-4">
                  <button
                    v-for="item in managementCards"
                    :key="item.label"
                    type="button"
                    @click="setActiveTab(item.tab)"
                    class="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-black/20 px-5 py-4 text-left transition hover:border-white/20 hover:bg-white/10"
                  >
                    <div>
                      <div class="font-semibold text-white">{{ item.label }}</div>
                      <div class="mt-1 text-sm text-slate-400">{{ item.description }}</div>
                    </div>
                    <div class="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white">{{ item.value }}</div>
                  </button>
                </div>
              </div>

              <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Public routes</div>
                <h2 class="mt-2 text-2xl font-bold text-white">Preview key pages</h2>
                <div class="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    v-for="route in publicRoutes"
                    :key="route.label"
                    type="button"
                    @click="openPublicRoute(route.path)"
                    class="rounded-3xl border border-white/10 bg-black/20 px-5 py-4 text-left transition hover:border-white/20 hover:bg-white/10"
                  >
                    <div class="font-semibold text-white">{{ route.label }}</div>
                    <div class="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{{ route.path }}</div>
                  </button>
                </div>
              </div>

              <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Maintenance</div>
                <h2 class="mt-2 text-2xl font-bold text-white">Safe system operations</h2>
                <div class="mt-6 space-y-4">
                  <button type="button" @click="refreshDashboard" class="w-full rounded-3xl border border-white/10 bg-black/20 px-5 py-4 text-left transition hover:border-white/20 hover:bg-white/10">
                    <div class="font-semibold text-white">Refresh dashboard data</div>
                    <div class="mt-1 text-sm text-slate-400">Reload projects, skills, profile, inbox, and traffic from the API.</div>
                  </button>
                  <button type="button" @click="clearWorkingForms" class="w-full rounded-3xl border border-white/10 bg-black/20 px-5 py-4 text-left transition hover:border-white/20 hover:bg-white/10">
                    <div class="font-semibold text-white">Reset editor forms</div>
                    <div class="mt-1 text-sm text-slate-400">Clear unsaved project and skill edits while leaving stored data intact.</div>
                  </button>

                  <div class="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div class="font-semibold text-white">Adjust visit counter</div>
                    <div class="mt-1 text-sm text-slate-400">Set the public views total without touching projects, skills, profile, or messages.</div>
                    <div class="mt-4 flex flex-col gap-3 sm:flex-row">
                      <input v-model.number="manualViews" type="number" min="0" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
                      <button type="button" @click="applyViewsCount" class="rounded-2xl bg-gradient-to-r from-primary to-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1">Save counter</button>
                      <button type="button" @click="resetViews" class="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">Reset to zero</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Security and session</div>
                <h2 class="mt-2 text-2xl font-bold text-white">Admin protection summary</h2>
                <div class="mt-6 space-y-4">
                  <div class="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div class="font-semibold text-white">Authenticated user</div>
                    <div class="mt-2 text-sm text-slate-300">{{ authStore.user?.name || 'Administrator' }}</div>
                    <div class="mt-1 break-all text-xs text-slate-500">{{ authStore.user?.email || 'No email available' }}</div>
                  </div>
                  <div class="rounded-3xl border border-white/10 bg-black/20 p-5 text-sm leading-6 text-slate-400">
                    Uploads require admin authentication now, and inbox actions are backed by real update and delete endpoints.
                  </div>
                  <button type="button" @click="logout" class="w-full rounded-3xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-left transition hover:bg-red-500 hover:text-white">
                    <div class="font-semibold text-red-200">End admin session</div>
                    <div class="mt-1 text-sm text-red-100/70">Sign out and return to the admin login page.</div>
                  </button>
                </div>
              </div>

              <div class="rounded-[2rem] border border-amber-500/10 bg-gradient-to-br from-amber-500/5 to-transparent p-6 backdrop-blur-2xl">
                <div class="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300">Change password</div>
                <h2 class="mt-3 text-2xl font-bold text-white">Update admin credentials</h2>
                <div class="mt-6 space-y-4">
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-slate-300">Current password</label>
                    <div class="relative">
                      <input :type="showCurrentPw ? 'text' : 'password'" v-model="passwordForm.current" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pr-11 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
                      <button type="button" @click="showCurrentPw = !showCurrentPw" class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white">
                        <svg v-if="!showCurrentPw" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-slate-300">New password</label>
                    <div class="relative">
                      <input :type="showNewPw ? 'text' : 'password'" v-model="passwordForm.newPassword" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pr-11 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
                      <button type="button" @click="showNewPw = !showNewPw" class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white">
                        <svg v-if="!showNewPw" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-slate-300">Confirm new password</label>
                    <input :type="showNewPw ? 'text' : 'password'" v-model="passwordForm.confirm" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                  <div v-if="passwordError" class="text-sm text-red-400">{{ passwordError }}</div>
                  <button type="button" @click="changePassword" class="w-full rounded-2xl bg-gradient-to-r from-primary to-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 disabled:opacity-50" :disabled="changingPassword">
                    <span v-if="changingPassword" class="inline-flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span> Updating...</span>
                    <span v-else>Update password</span>
                  </button>
                </div>
              </div>

              <div class="rounded-[2rem] border border-sky-500/10 bg-gradient-to-br from-sky-500/5 to-transparent p-6 backdrop-blur-2xl">
                <div class="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">Site identity</div>
                <h2 class="mt-3 text-2xl font-bold text-white">Brand name, logo & URL</h2>
                <div class="mt-6 space-y-4">
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-slate-300">Site name</label>
                    <input v-model="siteIdentity.name" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-slate-300">Site description</label>
                    <textarea v-model="siteIdentity.description" rows="2" class="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-slate-300">Site URL (for browser bar)</label>
                    <input v-model="siteIdentity.siteUrl" placeholder="https://boniq.dev" class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-slate-300">Site logo</label>
                    <div class="flex items-center gap-4 rounded-2xl border border-dashed border-white/20 bg-black/20 p-4">
                      <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                        <img v-if="siteIdentity.logoUrl" :src="siteIdentity.logoUrl" alt="Logo" class="h-full w-full object-contain" />
                        <span v-else class="text-2xl font-black text-white/40">?</span>
                      </div>
                      <div class="flex-1">
                        <label class="relative inline-flex cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                          <input type="file" accept="image/*" class="absolute inset-0 cursor-pointer opacity-0" @change="handleFileUpload($event, 'logo')" />
                          <span v-if="uploading.logo" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                          <span v-else>Upload logo</span>
                        </label>
                        <button v-if="siteIdentity.logoUrl" type="button" @click="siteIdentity.logoUrl = ''" class="ml-2 text-xs text-red-400 hover:text-red-300">Remove</button>
                      </div>
                    </div>
                  </div>
                  <button type="button" @click="saveSiteIdentity" class="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 disabled:opacity-50" :disabled="savingSiteIdentity">
                    <span v-if="savingSiteIdentity" class="inline-flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span> Saving...</span>
                    <span v-else>Save site identity</span>
                  </button>
                </div>
              </div>

            </div>
          </section>
        </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const createProjectForm = () => ({
  title: '',
  description: '',
  imageUrl: '',
  githubLink: '',
  liveDemo: '',
  technologies: []
});

const createSkillForm = () => ({
  name: '',
  icon: 'S',
  category: 'Frontend',
  level: 80
});

const createProfileData = () => ({
  name: '',
  greeting: '',
  role: '',
  bio: '',
  avatarUrl: '',
  cvUrl: '',
  whatsapp: '',
  linkedin: '',
  instagram: ''
});

const activeTab = ref('Overview');
const projects = ref([]);
const skills = ref([]);
const messages = ref([]);
const viewsCount = ref(0);
const manualViews = ref(0);
const lastSync = ref('');

const projectForm = ref(createProjectForm());
const projectTechnologiesInput = ref('');
const editingProject = ref(null);
const projectSearch = ref('');

const skillForm = ref(createSkillForm());
const editingSkill = ref(null);
const skillSearch = ref('');
const skillCategoryFilter = ref('All');

const profileData = ref(createProfileData());
const savingProfile = ref(false);

const messageSearch = ref('');
const messageFilter = ref('All');
const messageFilters = ['All', 'Unread', 'Read'];

const loading = ref({ dashboard: true });
const uploading = ref({ avatar: false, project: false, skill: false, cv: false, logo: false });
const feedback = ref({ type: 'success', text: '' });

const passwordForm = ref({ current: '', newPassword: '', confirm: '' });
const showCurrentPw = ref(false);
const showNewPw = ref(false);
const changingPassword = ref(false);
const passwordError = ref('');

const siteIdentity = ref({ name: 'boniq', description: 'Advanced Portfolio System', logoUrl: '', siteUrl: '' });
const savingSiteIdentity = ref(false);

const skillCategories = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'DevOps', 'Other'];
const publicRoutes = [
  { label: 'Homepage', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' }
];

let feedbackTimeout = null;

const getAuthConfig = () => {
  const token = authStore.token || localStorage.getItem('boniq_token');
  if (!token) {
    router.push('/admin');
    return {};
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const isFilled = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return Boolean(value);
};

const normalizeTechnologies = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item || '').trim())
      .filter(Boolean);
  }

  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const isImageValue = (value) => {
  return typeof value === 'string' && (value.startsWith('/') || value.startsWith('http'));
};

const showFeedback = (type, text) => {
  feedback.value = { type, text };
  clearTimeout(feedbackTimeout);
  feedbackTimeout = setTimeout(() => {
    feedback.value = { type: 'success', text: '' };
  }, 4000);
};

const formatDate = (value) => {
  if (!value) return 'Unknown';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return date.toLocaleString();
};

const setActiveTab = (tab) => {
  activeTab.value = tab;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const fetchData = async ({ silent = false } = {}) => {
  if (!silent) {
    loading.value.dashboard = true;
  }

  try {
    const [projectResponse, skillResponse, messageResponse, profileResponse, statsResponse] = await Promise.all([
      axios.get('/api/projects').catch(() => ({ data: [] })),
      axios.get('/api/skills').catch(() => ({ data: [] })),
      axios.get('/api/messages', getAuthConfig()).catch(() => ({ data: [] })),
      axios.get('/api/profile').catch(() => ({ data: {} })),
      axios.get('/api/stats').catch(() => ({ data: { views: 0 } }))
    ]);

    projects.value = Array.isArray(projectResponse.data) ? projectResponse.data : [];
    skills.value = Array.isArray(skillResponse.data) ? skillResponse.data : [];
    messages.value = Array.isArray(messageResponse.data) ? messageResponse.data : [];
    profileData.value = { ...createProfileData(), ...(profileResponse.data || {}) };
    siteIdentity.value = {
      name: profileResponse.data?.name || 'boniq',
      description: profileResponse.data?.bio || 'Advanced Portfolio System',
      logoUrl: profileResponse.data?.logoUrl || '',
      siteUrl: profileResponse.data?.siteUrl || ''
    };
    viewsCount.value = Number(statsResponse.data?.views || 0);
    manualViews.value = viewsCount.value;
    lastSync.value = new Date().toISOString();
  } catch (error) {
    console.error('Dashboard fetch failed:', error);
    showFeedback('error', 'The dashboard could not load every resource. Some sections may be incomplete.');
  } finally {
    loading.value.dashboard = false;
  }
};

const handleFileUpload = async (event, type) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  uploading.value[type] = true;

  try {
    const response = await axios.post('/api/upload', formData, getAuthConfig());
    const uploadedUrl = typeof response.data === 'string' ? response.data : response.data?.url;

    if (type === 'avatar') profileData.value.avatarUrl = uploadedUrl;
    if (type === 'project') projectForm.value.imageUrl = uploadedUrl;
    if (type === 'skill') skillForm.value.icon = uploadedUrl;
    if (type === 'cv') profileData.value.cvUrl = uploadedUrl;
    if (type === 'logo') siteIdentity.value.logoUrl = uploadedUrl;

    showFeedback('success', 'Upload completed successfully.');
  } catch (error) {
    console.error('Upload failed:', error);
    showFeedback('error', error.response?.data?.message || 'Upload failed. Please try again.');
  } finally {
    uploading.value[type] = false;
    event.target.value = '';
  }
};

const saveProfile = async () => {
  savingProfile.value = true;

  try {
    const response = await axios.put('/api/profile', profileData.value, getAuthConfig());
    profileData.value = { ...createProfileData(), ...(response.data || {}) };
    showFeedback('success', 'Profile settings saved successfully.');
  } catch (error) {
    console.error('Profile save failed:', error);
    showFeedback('error', error.response?.data?.message || 'Profile update failed.');
  } finally {
    savingProfile.value = false;
  }
};

const buildProjectPayload = () => ({
  title: projectForm.value.title,
  description: projectForm.value.description,
  imageUrl: projectForm.value.imageUrl,
  githubLink: projectForm.value.githubLink,
  liveDemo: projectForm.value.liveDemo,
  technologies: normalizeTechnologies(projectTechnologiesInput.value)
});

const addProject = async () => {
  try {
    const response = await axios.post('/api/projects', buildProjectPayload(), getAuthConfig());
    projects.value = [response.data, ...projects.value];
    resetProjectForm();
    showFeedback('success', 'Project created successfully.');
  } catch (error) {
    console.error('Project create failed:', error);
    showFeedback('error', error.response?.data?.message || 'Project creation failed.');
  }
};

const editProjectSetup = (project) => {
  editingProject.value = project._id;
  projectForm.value = {
    title: project.title || '',
    description: project.description || '',
    imageUrl: project.imageUrl || '',
    githubLink: project.githubLink || '',
    liveDemo: project.liveDemo || '',
    technologies: normalizeTechnologies(project.technologies)
  };
  projectTechnologiesInput.value = normalizeTechnologies(project.technologies).join(', ');
  setActiveTab('Projects');
};

const updateProject = async () => {
  try {
    const response = await axios.put(`/api/projects/${editingProject.value}`, buildProjectPayload(), getAuthConfig());
    projects.value = projects.value.map((project) => (project._id === editingProject.value ? response.data : project));
    resetProjectForm();
    showFeedback('success', 'Project updated successfully.');
  } catch (error) {
    console.error('Project update failed:', error);
    showFeedback('error', error.response?.data?.message || 'Project update failed.');
  }
};

const deleteProject = async (id) => {
  if (!confirm('Delete this project from the portfolio?')) return;

  try {
    await axios.delete(`/api/projects/${id}`, getAuthConfig());
    projects.value = projects.value.filter((project) => project._id !== id);
    if (editingProject.value === id) {
      resetProjectForm();
    }
    showFeedback('success', 'Project deleted successfully.');
  } catch (error) {
    console.error('Project delete failed:', error);
    showFeedback('error', error.response?.data?.message || 'Project deletion failed.');
  }
};

const resetProjectForm = () => {
  editingProject.value = null;
  projectForm.value = createProjectForm();
  projectTechnologiesInput.value = '';
};

const buildSkillPayload = () => ({
  name: skillForm.value.name,
  icon: skillForm.value.icon,
  category: skillForm.value.category,
  level: Math.min(100, Math.max(1, Number(skillForm.value.level || 1)))
});

const addSkill = async () => {
  try {
    const response = await axios.post('/api/skills', buildSkillPayload(), getAuthConfig());
    skills.value = [response.data, ...skills.value];
    resetSkillForm();
    showFeedback('success', 'Skill created successfully.');
  } catch (error) {
    console.error('Skill create failed:', error);
    showFeedback('error', error.response?.data?.message || 'Skill creation failed.');
  }
};

const editSkillSetup = (skill) => {
  editingSkill.value = skill._id;
  skillForm.value = {
    name: skill.name || '',
    icon: skill.icon || 'S',
    category: skill.category || 'Frontend',
    level: Number(skill.level || 1)
  };
  setActiveTab('Skills');
};

const updateSkill = async () => {
  try {
    const response = await axios.put(`/api/skills/${editingSkill.value}`, buildSkillPayload(), getAuthConfig());
    skills.value = skills.value.map((skill) => (skill._id === editingSkill.value ? response.data : skill));
    resetSkillForm();
    showFeedback('success', 'Skill updated successfully.');
  } catch (error) {
    console.error('Skill update failed:', error);
    showFeedback('error', error.response?.data?.message || 'Skill update failed.');
  }
};

const deleteSkill = async (id) => {
  if (!confirm('Delete this skill from the portfolio?')) return;

  try {
    await axios.delete(`/api/skills/${id}`, getAuthConfig());
    skills.value = skills.value.filter((skill) => skill._id !== id);
    if (editingSkill.value === id) {
      resetSkillForm();
    }
    showFeedback('success', 'Skill deleted successfully.');
  } catch (error) {
    console.error('Skill delete failed:', error);
    showFeedback('error', error.response?.data?.message || 'Skill deletion failed.');
  }
};

const resetSkillForm = () => {
  editingSkill.value = null;
  skillForm.value = createSkillForm();
};

const markMessageStatus = async (message, nextStatus) => {
  try {
    const response = await axios.put(`/api/messages/${message._id}`, { isRead: nextStatus }, getAuthConfig());
    messages.value = messages.value.map((entry) => (entry._id === message._id ? response.data : entry));
    showFeedback('success', `Message marked as ${nextStatus ? 'read' : 'unread'}.`);
  } catch (error) {
    console.error('Message status update failed:', error);
    showFeedback('error', error.response?.data?.message || 'Message status update failed.');
  }
};

const deleteMessage = async (id) => {
  if (!confirm('Delete this message from the inbox?')) return;

  try {
    await axios.delete(`/api/messages/${id}`, getAuthConfig());
    messages.value = messages.value.filter((message) => message._id !== id);
    showFeedback('success', 'Message deleted successfully.');
  } catch (error) {
    console.error('Message delete failed:', error);
    showFeedback('error', error.response?.data?.message || 'Message deletion failed.');
  }
};

const refreshDashboard = async () => {
  await fetchData({ silent: true });
  showFeedback('success', 'Dashboard data refreshed.');
};

const clearWorkingForms = () => {
  resetProjectForm();
  resetSkillForm();
  projectSearch.value = '';
  skillSearch.value = '';
  skillCategoryFilter.value = 'All';
  messageSearch.value = '';
  messageFilter.value = 'All';
  manualViews.value = viewsCount.value;
  showFeedback('success', 'Working forms and filters were reset.');
};

const applyViewsCount = async () => {
  const normalizedViews = Math.max(0, Number(manualViews.value || 0));

  try {
    const response = await axios.put('/api/stats', { views: normalizedViews }, getAuthConfig());
    viewsCount.value = Number(response.data?.views || 0);
    manualViews.value = viewsCount.value;
    showFeedback('success', 'View counter updated successfully.');
  } catch (error) {
    console.error('View counter update failed:', error);
    showFeedback('error', error.response?.data?.message || 'View counter update failed.');
  }
};

const resetViews = async () => {
  if (!confirm('Reset the public visit counter to zero?')) return;
  manualViews.value = 0;
  await applyViewsCount();
};

const changePassword = async () => {
  passwordError.value = '';
  if (!passwordForm.value.current || !passwordForm.value.newPassword || !passwordForm.value.confirm) {
    passwordError.value = 'All fields are required.';
    return;
  }
  if (passwordForm.value.newPassword.length < 6) {
    passwordError.value = 'New password must be at least 6 characters.';
    return;
  }
  if (passwordForm.value.newPassword !== passwordForm.value.confirm) {
    passwordError.value = 'New passwords do not match.';
    return;
  }
  changingPassword.value = true;
  try {
    const { data } = await axios.put('/api/auth/password', {
      currentPassword: passwordForm.value.current,
      newPassword: passwordForm.value.newPassword
    }, getAuthConfig());
    if (data.token) {
      authStore.token = data.token;
      localStorage.setItem('boniq_token', data.token);
    }
    passwordForm.value = { current: '', newPassword: '', confirm: '' };
    showFeedback('success', 'Password updated successfully. A new token has been issued.');
  } catch (error) {
    passwordError.value = error.response?.data?.message || 'Password update failed.';
    showFeedback('error', passwordError.value);
  } finally {
    changingPassword.value = false;
  }
};

const saveSiteIdentity = async () => {
  savingSiteIdentity.value = true;
  try {
    const payload = {
      name: siteIdentity.value.name || 'boniq',
      greeting: profileData.value.greeting,
      role: profileData.value.role,
      bio: siteIdentity.value.description || profileData.value.bio,
      avatarUrl: profileData.value.avatarUrl,
      cvUrl: profileData.value.cvUrl,
      whatsapp: profileData.value.whatsapp,
      linkedin: profileData.value.linkedin,
      instagram: profileData.value.instagram,
      logoUrl: siteIdentity.value.logoUrl || '',
      siteUrl: siteIdentity.value.siteUrl || ''
    };
    const response = await axios.put('/api/profile', payload, getAuthConfig());
    const saved = response.data || {};
    profileData.value = { ...createProfileData(), ...saved };
    siteIdentity.value = {
      name: saved.name || 'boniq',
      description: saved.bio || 'Advanced Portfolio System',
      logoUrl: saved.logoUrl || '',
      siteUrl: saved.siteUrl || ''
    };
    if (saved.logoUrl) {
      authStore.logoUrl = saved.logoUrl;
      localStorage.setItem('boniq_logo', saved.logoUrl);
    }
    showFeedback('success', 'Site identity saved successfully.');
  } catch (error) {
    showFeedback('error', error.response?.data?.message || 'Site identity update failed.');
  } finally {
    savingSiteIdentity.value = false;
  }
};

const openPublicRoute = (path) => {
  window.open(path, '_blank', 'noopener,noreferrer');
};

const logout = () => {
  authStore.logout();
  router.push('/admin');
};

const unreadMessages = computed(() => messages.value.filter((message) => !message.isRead));

const filteredMessages = computed(() => {
  const query = messageSearch.value.trim().toLowerCase();

  return messages.value.filter((message) => {
    const statusMatches =
      messageFilter.value === 'All' ||
      (messageFilter.value === 'Unread' && !message.isRead) ||
      (messageFilter.value === 'Read' && message.isRead);

    const searchMatches =
      !query ||
      [message.name, message.email, message.subject, message.content]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));

    return statusMatches && searchMatches;
  });
});

const filteredProjects = computed(() => {
  const query = projectSearch.value.trim().toLowerCase();
  if (!query) return projects.value;

  return projects.value.filter((project) => {
    const technologies = normalizeTechnologies(project.technologies).join(' ');
    return [project.title, project.description, project.githubLink, project.liveDemo, technologies]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));
  });
});

const filteredSkills = computed(() => {
  const query = skillSearch.value.trim().toLowerCase();

  return skills.value.filter((skill) => {
    const matchesSearch =
      !query ||
      [skill.name, skill.category, skill.icon]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));

    const matchesCategory = skillCategoryFilter.value === 'All' || skill.category === skillCategoryFilter.value;

    return matchesSearch && matchesCategory;
  });
});

const profileChecklist = computed(() => {
  const data = profileData.value;
  return [
    { label: 'Display name', complete: isFilled(data.name) },
    { label: 'Greeting', complete: isFilled(data.greeting) },
    { label: 'Role', complete: isFilled(data.role) },
    { label: 'Biography', complete: isFilled(data.bio) },
    { label: 'Avatar', complete: isFilled(data.avatarUrl) },
    { label: 'CV link', complete: isFilled(data.cvUrl) },
    { label: 'WhatsApp', complete: isFilled(data.whatsapp) },
    { label: 'LinkedIn', complete: isFilled(data.linkedin) },
    { label: 'Instagram', complete: isFilled(data.instagram) }
  ];
});

const completedProfileFields = computed(() => profileChecklist.value.filter((item) => item.complete).length);

const profileCompletion = computed(() => {
  if (profileChecklist.value.length === 0) return 0;
  return Math.round((completedProfileFields.value / profileChecklist.value.length) * 100);
});

const profileInitials = computed(() => {
  const name = String(profileData.value.name || 'A').trim();
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'A';
});

const recentProjects = computed(() =>
  [...projects.value]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
    .slice(0, 3)
);

const recentSkills = computed(() =>
  [...skills.value]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
    .slice(0, 3)
);

const statsCards = computed(() => [
  {
    label: 'Public views',
    value: viewsCount.value,
    note: 'Traffic counter',
    className: 'border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>'
  },
  {
    label: 'Projects',
    value: projects.value.length,
    note: 'Portfolio items',
    className: 'border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-transparent',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>'
  },
  {
    label: 'Skills',
    value: skills.value.length,
    note: 'Capability records',
    className: 'border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>'
  },
  {
    label: 'Unread inbox',
    value: unreadMessages.value.length,
    note: `${messages.value.length} total`,
    className: 'border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>'
  }
]);

const tabs = computed(() => [
  { label: 'Overview', count: `${projects.value.length + skills.value.length}`, icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>' },
  { label: 'Profile', count: `${profileCompletion.value}%`, icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>' },
  { label: 'Projects', count: `${projects.value.length}`, icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>' },
  { label: 'Skills', count: `${skills.value.length}`, icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>' },
  { label: 'Inbox', count: `${unreadMessages.value.length}`, icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>' },
  { label: 'Settings', count: 'Tools', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>' }
]);

const attentionItems = computed(() => {
  const items = [];

  if (profileCompletion.value < 100) {
    items.push({
      label: 'Profile still has missing fields',
      description: `${profileChecklist.value.length - completedProfileFields.value} profile settings still need values.`,
      tab: 'Profile'
    });
  }

  if (unreadMessages.value.length > 0) {
    items.push({
      label: 'Unread messages need review',
      description: `${unreadMessages.value.length} message${unreadMessages.value.length === 1 ? '' : 's'} are still unread.`,
      tab: 'Inbox'
    });
  }

  if (projects.value.length === 0) {
    items.push({
      label: 'No projects are published',
      description: 'Add at least one project so the public projects page is not empty.',
      tab: 'Projects'
    });
  }

  if (skills.value.length === 0) {
    items.push({
      label: 'No skills are published',
      description: 'Add skill records so the public skills page has content.',
      tab: 'Skills'
    });
  }

  return items;
});

const managementCards = computed(() => [
  {
    label: 'Profile manager',
    description: 'Hero copy, avatar, bio, links, and CV asset.',
    tab: 'Profile',
    value: `${profileCompletion.value}%`
  },
  {
    label: 'Project manager',
    description: 'Descriptions, links, images, and technology stacks.',
    tab: 'Projects',
    value: `${projects.value.length}`
  },
  {
    label: 'Skill manager',
    description: 'Icons, categories, and percentage levels.',
    tab: 'Skills',
    value: `${skills.value.length}`
  },
  {
    label: 'Inbox manager',
    description: 'Read status and delete operations for messages.',
    tab: 'Inbox',
    value: `${unreadMessages.value.length}`
  }
]);

const lastSyncLabel = computed(() => (lastSync.value ? formatDate(lastSync.value) : 'Not synced yet'));

onMounted(() => {
  fetchData();
});

onUnmounted(() => {
  clearTimeout(feedbackTimeout);
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.35s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 999px;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.18);
  border-radius: 999px;
}
</style>
