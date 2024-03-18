<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import { ONE_DAY_MS } from '$lib/config/constants.js';
  import { sessionAddress, loginTimestamp } from '$lib/services/stores.js';

  async function logoutConfirm() {
    if (confirm("Are you sure you want to log out?")) {
      await goto("/logout");
    }
  }
</script>

<header>
  <div class="navbar bg-base-300 p-2 lg:p-3 rounded-box shadow">
    <div class="flex-1" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
      <a class="btn btn-ghost normal-case text-xl" href="/">
        <img src="/favicon.ico" class="w-8 h-8 rounded-box" alt="logo"/>
        Banfts
      </a>
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
            </svg>
                  
          </a>
        </li>
        <li class="tooltip tooltip-bottom" data-tip="Minters" aria-current={$page.url.pathname === '/trending' ? 'page' : undefined}>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <div class="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
                <!--<span class="badge badge-sm indicator-item">0</span>-->
              </div>
            </label>
            <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div class="card-body">
                <div class="card-actions">
                  <a class="btn btn-primary btn-block" href="/market/official_sales">Official Sales</a>
                </div>
                <div class="card-actions">
                  <a class="btn btn-primary btn-block" href="/explorer/minters">All Minters</a>
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
                {#if $sessionAddress.startsWith("ban_") && $loginTimestamp > Date.now() - ONE_DAY_MS}
                  <li aria-current={$page.url.pathname === '/account' ? 'page' : undefined}>
                    <a class="justify-between" href="/account">
                      Account
                      <span class="badge">New</span>
                    </a>
                  </li>
                  <li aria-current={$page.url.pathname === '/settings' ? 'page' : undefined}><a href="/settings">Settings</a></li>
                {/if}
                <li aria-current={$page.url.pathname === '/minting' ? 'page' : undefined}><a href="/minting">Minting</a></li>
                {#if $sessionAddress.startsWith("ban_") && $loginTimestamp > Date.now() - ONE_DAY_MS}
                  <li aria-current={$page.url.pathname === '/logout' ? 'page' : undefined}><button on:click={logoutConfirm}>Logout</button></li>
                {/if}
              </ul>
            </div>
          </li>
      </ul>
    </div>
  </div>
</header>
