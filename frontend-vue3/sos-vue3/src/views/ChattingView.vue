<template>
  <div class="h-full main">
    <div class="unzo">
      <div class="main__body">
        <!-- 개별 채팅 -->
        <div class="main__body--single-chat" v-for="msg in 10" :key="msg">
          <img class="w-8 h-8 rounded-full" src="@/assets/deer.png" alt="프로필 사진" />
          <div class="main__body--chat-context">
            <!-- 채팅 이름 -->
            <span class="text-sm font-semibold text-gray-900">이름: </span>
            <!-- 채팅 내용 -->
            <span class="text-sm font-normal py-2.5 text-gray-900">메시지</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main__feature">
      <form @submit.prevent="" class="flex justify-between flex-grow">
        <!-- 텍스트 입력창 -->
        <input type="text" placeholder="Say something" class="main__feature--input" />

        <!-- 전송 버튼 -->
        <button class="main__feature--send-button">
          <svg
            class="w-6 h-6 text-white transform rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"
            />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.main {
  @apply flex flex-col border-gray-300 border rounded-md shadow-lg opacity-80;
}
.main__info {
  @apply flex items-center justify-between border-gray-300 bg-violet-500 rounded-t-md;
  height: 60px;
  min-height: 60px;
}
.main__room-num {
  @apply ml-5 font-bold text-white;
}

.main__room-time {
  @apply text-white m-4 font-semibold;
}

.main__title {
  @apply flex items-center self-center justify-center h-14 bg-white z-10 font-extrabold border-2 rounded-md shadow-md border-violet-400 px-10 w-full mt-1;
  height: 60px;
  min-height: 60px;
}

.main__body {
  @apply flex flex-col items-start justify-end grow;
}

.unzo::-webkit-scrollbar {
  @apply hidden;
}

.main__body--single-chat {
  @apply flex justify-center items-center ml-4 mt-2 mb-2 gap-1 relative;
}

.main__body--chat-context {
  max-width: 270px;
}

.main__feature {
  @apply flex items-center h-14 border border-gray-300 rounded-lg py-7 px-3 mx-3 mb-5 mt-1 shadow-md;
}

.main__feature--input {
  @apply flex-grow border border-none rounded-md;
}

.main__feature--send-button {
  @apply cursor-pointer bg-yellow-800 p-2 ms-3 rounded-3xl hover:bg-yellow-900 shadow-lg;
}

/* 채팅이 정해진 범위 벗어나면  */
.unzo {
  @apply flex-grow flex flex-col-reverse;
  overflow-y: auto;
}
</style>
