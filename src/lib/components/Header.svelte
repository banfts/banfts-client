<script>
	import { page } from '$app/stores';
  import { sessionAddress } from '$lib/services/stores.js';
</script>

<header>
  <div class="navbar bg-base-300 p-2 lg:p-3 rounded-box shadow">
    <div class="flex-1" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
      <a class="btn btn-ghost normal-case text-xl" href="/">Banfts</a>
    </div>
    <div class="flex-none">
      <ul>
        <li class="tooltip tooltip-bottom" data-tip="Explorer" aria-current={$page.url.pathname === '/explorer' ? 'page' : undefined}>
          <a class="btn btn-ghost btn-circle" href="/explorer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </a>
        </li>
        <li class="tooltip tooltip-bottom" data-tip="Market" aria-current={$page.url.pathname === '/market' ? 'page' : undefined}>
          <a class="btn btn-ghost btn-circle" href="/market">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
            </svg>  
          </a>
        </li>
        <li class="tooltip tooltip-bottom" data-tip="Trending" aria-current={$page.url.pathname === '/trending' ? 'page' : undefined}>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <div class="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                </svg>
                
                <span class="badge badge-sm indicator-item">0</span>
              </div>
            </label>
            <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div class="card-body">
                <span class="font-bold text-lg">Trending NFTs</span>
                <span class="text-info">...</span>
                <div class="card-actions">
                  <button class="btn btn-primary btn-block">View listing</button>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="tooltip tooltip-bottom" data-tip="Account">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </label>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li aria-current={$page.url.pathname === '/account' ? 'page' : undefined}>
                <a class="justify-between" href="/account?address={$sessionAddress}">
                  Account
                  <span class="badge">New</span>
                </a>
              </li>
              <li aria-current={$page.url.pathname === '/settings' ? 'page' : undefined}><a href="/settings">Settings</a></li>
              <li aria-current={$page.url.pathname === '/logout' ? 'page' : undefined}><a href="/logout">Logout</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</header>
