<template>
  <main class="w-full max-w-4xl text-center mx-auto mb-6 flex flex-col h-full animate-pulse">
    <div
      class="flex-shrink-0 p-4 md:px-10 flex flex-row justify-between items-start sm:items-center gap-4"
    >
      <div class="h-10 bg-gray-300 rounded w-3/5"></div>
      <div class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
    </div>

    <div class="flex-grow overflow-y-auto px-4 md:px-10 pb-4">
      <!-- visuals -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="md:col-span-1 flex flex-row md:flex-col gap-6 md:gap-1">
          <!-- image -->
          <div class="w-40 h-40 md:w-full md:h-50 bg-gray-300 rounded-lg shadow-md mb-2"></div>
          <!-- properties -->
          <div class="flex flex-col justify-end">
            <div class="h-4 bg-gray-300 rounded w-25 mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-30 mb-2"></div>
          </div>
        </div>
        <!-- video -->
        <div class="md:col-span-2 space-y-2">
          <div class="w-full h-64 bg-gray-300 rounded-lg shadow-md mb-2"></div>
        </div>
        <!-- tags -->
        <div class="col-span-4 w-full flex flex-wrap items-center gap-2">
          <div class="h-4 bg-gray-300 rounded w-20"></div>
          <div class="h-6 w-20 bg-gray-300 rounded-full"></div>
          <div class="h-6 w-20 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      <!-- ingredients -->
      <div class="mb-6">
        <div class="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div class="flex flex-wrap items-center gap-2">
          <div class="h-1 bg-gray-300 rounded w-1"></div>
          <div class="h-4 bg-gray-300 rounded w-1/6"></div>
          <div class="h-1 bg-gray-300 rounded w-1"></div>
          <div class="h-4 bg-gray-300 rounded w-2/8"></div>
          <div class="h-1 bg-gray-300 rounded w-1"></div>
          <div class="h-4 bg-gray-300 rounded w-1/8"></div>
          <div class="h-1 bg-gray-300 rounded w-1"></div>
          <div class="h-4 bg-gray-300 rounded w-1/9"></div>
        </div>
      </div>
      <!-- instructions -->
      <div>
        <div class="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-300 rounded w-full"></div>
          <div class="h-4 bg-gray-300 rounded w-full"></div>
          <div class="h-4 bg-gray-300 rounded w-5/6"></div>
          <div class="h-4 bg-gray-300 rounded w-full"></div>
          <div class="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  </main>
</template>
