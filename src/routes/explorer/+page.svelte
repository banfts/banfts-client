<div class="flex flex-col w-full bg-base-300 rounded-box shadow p-4 my-4">
  <div class="mb-2 mx-auto">
    <div class="text-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-400 mb-2">Explorer</h1>
      <p class="small text-gray-600">Search by address, mint hash or supply hash.</p>
    </div>
  </div>

  <div class="mx-auto mb-4">
    <div class="join">
      <div>
        <div>
          <input class="input input-bordered w-full max-w-xs join-item" placeholder="Search"/>
        </div>
      </div>
      <select class="select select-bordered join-item">
        <option disabled selected>Filter</option>
        <option>Supply hash</option>
        <option>Mint hash</option>
      </select>
      <div>
        <button class="btn btn-primary join-item">Search</button>
      </div>
    </div>
  </div>
  <div class="divider"></div> 
  <div class="mt-4">
    <div class="max-w-7xl sm:px-4 lg:px-8">
      <h2 class="text-xl font-bold tracking-tight text-gray-400 mb-4">Feaured</h2>
    </div>
  </div>
  <div class="max-w-full px-4 pb-4 sm:px-6 lg:px-8">
    <div class="my-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      
      <div class="group">
        <div class="card card-compact w-100 bg-base-100 shadow-xl">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
            <img class="h-full w-full object-cover object-center lg:h-full lg:w-full" src="https://dummyimage.com/600x400/000/fff" alt="Shoes" /> 
          </div>
          <div class="card-body">
            <h2 class="card-title">Asset Name</h2>
            <div class="flex flex-col my-2">
              <div class="flex justify-between">
                <h3 class="text-sm text-gray-400">Ask Price</h3>
                <p class="text-end text-yellow-200 font-bold">199 BAN</p>
              </div>
              <div class="flex justify-between">
                <p class="text-xs text-end text-yellow-200">$0.9 USD</p>
              </div>
            </div>
            <div class="card-actions justify-end">
              <button class="btn btn-primary btn-sm btn-block">Buy</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
