<template>
  <svg
    v-if="name === 'love'"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    style="isolation:isolate"
    viewBox="0 0 43 40"
  >
    <path
      d="M20 4c-2-2-5-4-9-4C5 0 0 5 0 12q0 9 20 23 20-13 20-23c0-9-5-12-11-12-4 0-7 2-9 4z"
    />
  </svg>

  <svg
    v-else-if="name === 'message-corner'"
    class="icon"
    width="23"
    height="21"
    viewBox="0 0 23 21"
    xmlns="http://www.w3.org/2000/svg"
    style="isolation:isolate"
    fill="currentColor"
  >
    <path
      d="M20.5987 20.5H1.31751V0.5H5.49999C5.49999 8.7761 14.16 14.8728 21.063 18.3207C22.0552 18.8163 21.7079 20.5 20.5987 20.5Z"
    />
  </svg>

  <svg
    v-else-if="name === 'check-all'"
    width="43"
    height="28"
    viewBox="0 0 43 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 15.0213L10.9362 23.9574L32.8936 2"
      stroke-width="5"
    />
    <path
      d="M19.8723 26L40.8085 5.06384"
      stroke-width="5"
    />
  </svg>

  <svg
    v-else-if="name === 'moon'"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    style="isolation:isolate"
    viewBox="-1.257 -1.257 42.513 42.513"
  >
    <path
      d="M21.066.029C20.713.009 20.358 0 20 0 8.962 0 0 8.962 0 20s8.962 20 20 20 20-8.962 20-20c0-.358-.009-.713-.029-1.066-1.967 5.976-7.596 10.294-14.226 10.294-8.264 0-14.973-6.709-14.973-14.973 0-6.63 4.318-12.259 10.294-14.226z"
    />
  </svg>

  <svg
    v-else-if="name === 'sun'"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    style="isolation:isolate"
    viewBox="0 0 40 40"
    width="53"
    height="53"
  >
    <path
      d="M40 26l-4-6 4-6-1-1-6-2V4l-1-1-7 2-4-5h-1-1l-4 5-7-2-1 1v7l-6 2-1 1 4 6-4 6 1 1 6 2v7l1 1 7-2 4 5h2l4-5 7 2 1-1v-7l6-2 1-1zm-8-1a13 13 0 0 1-17 7 14 14 0 0 1-7-7 13 13 0 0 1 0-10 13 13 0 0 1 17-7 14 14 0 0 1 7 7 13 13 0 0 1 0 10z"
    />
  </svg>

  <svg
    v-else-if="name === 'favorites'"
    class="icon"
    width="15"
    height="23"
    viewBox="0 0 15 23"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 0H1C0.447715 0 0 0.447716 0 1V21.8C0 22.6586 1.01068 23.118 1.65753 22.5534L6.18493 18.6022C6.93836 17.9447 8.06164 17.9447 8.81507 18.6022L13.3425 22.5534C13.9893 23.118 15 22.6586 15 21.8V1C15 0.447715 14.5523 0 14 0Z"
    />
  </svg>

  <svg
    v-else-if="name === 'view'"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    style="isolation:isolate"
    viewBox="0 0 65.36 40.85"
  >
    <path
      d="M17.48 20.43a15.2 15.2 0 1 1 30.41 0 15.2 15.2 0 0 1-30.4 0zM0 20.43Q14.64 0 32.68 0t32.68 20.43Q50.72 40.84 32.68 40.84T0 20.42zm35.77-10.07a10.54 10.54 0 1 0 6.97 6.97 5.27 5.27 0 1 1-6.96-6.97z"
      fill-rule="evenodd"
    />
  </svg>

  <svg
    v-else-if="name === 'exit'"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    style="isolation:isolate"
    viewBox="0 1 40 40"
  >
    <path
      d="M20 38H5l-2-2V6l2-2h15a2 2 0 0 0 0-3H5C2 1 0 3 0 6v30c0 3 2 5 5 5h15a2 2 0 0 0 0-3zm20-18L29 10h-2v2l7 7H15l-2 2 2 2h19l-7 7a2 2 0 0 0 1 3l1-1 11-10a2 2 0 0 0 0-2z"
      fill-rule="evenodd"
    />
  </svg>

  <svg
    v-else-if="name === 'filter'"
    class="icon"
    height="394pt"
    viewBox="-5 0 394 394"
    width="394pt"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d=" m367.820312 0h-351.261718c-6.199219-.0117188-11.878906 3.449219-14.710938 8.960938-2.871094 5.585937-2.367187 12.3125 1.300782 17.414062l128.6875 181.285156c.042968.0625.089843.121094.132812.183594 4.675781 6.3125 7.207031 13.960938 7.21875 21.816406v147.800782c-.027344 4.375 1.691406 8.582031 4.773438 11.6875 3.085937 3.101562 7.28125 4.851562 11.65625 4.851562 2.222656-.003906 4.425781-.445312 6.480468-1.300781l72.3125-27.570313c6.476563-1.980468 10.777344-8.09375 10.777344-15.453125v-120.015625c.011719-7.855468 2.542969-15.503906 7.214844-21.816406.042968-.0625.089844-.121094.132812-.183594l128.691406-181.289062c3.667969-5.097656 4.171876-11.820313 1.300782-17.40625-2.828125-5.515625-8.511719-8.9765628-14.707032-8.964844zm0 0"
    />
  </svg>

  <svg
    v-else-if="name === 'user'"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    style="isolation:isolate"
    viewBox="0 -1 77 100"
  >
    <path
      d="M14 24a24 24 0 1 1 49 0 24 24 0 0 1-49 0zM0 100c0-26 17-46 38-46 22 0 39 20 39 46H0z"
      fill-rule="evenodd"
    />
  </svg>

  <svg
    v-else-if="name === 'settings'"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    style="isolation:isolate"
    viewBox="0 0 40 40"
  >
    <path
      d="M20 29a9 9 0 0 1-9-9 9 9 0 1 1 16 6c-2 2-4 3-7 3zm10 7l-2-1c-2-1-5 0-6 2l-1 1c-1 3-3 2-4 0l-1-2c-1-2-3-3-5-2H9c-3 1-4 0-3-2l1-2c0-2-1-5-3-6l-2-1c-2 0-3-2-1-3l2-1c2-2 3-4 2-6l-1-2C2 9 3 7 6 8h2c2 0 5-1 5-4V2c1-2 2-3 4-1l1 2c2 2 5 2 7 0l1-1c2-2 4-1 4 1v2c0 3 2 5 4 5h2c3 0 3 1 2 3l-1 2c-2 2-2 4 0 6l2 1c2 2 1 4-1 4h-2c-3 1-4 3-4 6l1 2c0 2-1 3-3 2z"
      fill-rule="evenodd"
    />
  </svg>

  <svg
    v-else-if="name === 'arrow'"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    style="isolation:isolate"
    viewBox="0 0 26 46"
  >
    <path
      fill="none"
      d=" M 23.408 3 L 3 23.408 L 23.408 43"
      stroke-width="6"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-miterlimit="3"
    />
  </svg>

  <svg
    v-else-if="name === 'search'"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    style="isolation:isolate"
    viewBox="-0.5 0 45 43"
  >
    <g
      stroke-width="5"
      stroke-miterlimit="3"
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="none"
        stroke-linecap="square"
      />
      <path
        stroke-linecap="round"
        d="M28 26l14 14"
      />
    </g>
  </svg>

  <svg
    v-else-if="name === 'apple'"
    xmlns="http://www.w3.org/2000/svg"
    style="isolation:isolate"
    viewBox="0 0 384 512"
    class="icon"
  >
    <path
      fill="currentColor"
      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
    />
  </svg>

  <svg
    v-else-if="name === 'google-play'"
    xmlns="http://www.w3.org/2000/svg"
    style="isolation:isolate"
    viewBox="0 0 512 512"
    class="icon"
  >
    <path
      fill="currentColor"
      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
    />
  </svg>

  <svg
    v-else-if="name === 'ruble'"
    width="80"
    v-bind="$attrs"
    class="icon"
    height="80"
    stroke="none"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80ZM30.0004 54.8403H23.8752C23.6198 54.8403 23.4106 54.7453 23.2462 54.5529C23.0817 54.3608 23 54.1162 23 53.8176V49.7265C23 49.4292 23.0823 49.1835 23.2462 48.9924C23.4106 48.8001 23.6198 48.704 23.8752 48.704H30.0004V44.9325H23.8752C23.6194 44.9325 23.4106 44.8376 23.2462 44.6453C23.0817 44.4531 23 44.2085 23 43.9099V39.1483C23 38.8714 23.0823 38.6318 23.2462 38.4293C23.4106 38.2269 23.6198 38.1259 23.8752 38.1259H29.9999V18.0225C29.9999 17.7256 30.0821 17.4794 30.2461 17.2872C30.4105 17.0961 30.6197 17 30.8752 17H44.6131C48.2586 17 51.2346 18.3011 53.5408 20.8989C55.8466 23.4994 57 26.8552 57 30.9663C57 35.0801 55.8466 38.4358 53.5408 41.0336C51.2342 43.6342 48.2587 44.9326 44.6131 44.9326H36.3162V48.704L42.5 48.704C42.7549 48.704 42.9651 48.8001 43.129 48.9924C43.2935 49.1835 43.3752 49.4297 43.3752 49.7265V53.8176C43.3752 54.1162 43.2935 54.3608 43.129 54.5529C42.9646 54.7452 42.7549 54.8402 42.5 54.8402L36.3166 54.8403V60.9774C36.3166 61.2759 36.2303 61.5205 36.0571 61.7115C35.8839 61.9038 35.6788 62 35.4418 62H30.8756C30.6202 62 30.4106 61.9038 30.2466 61.7115C30.0821 61.5205 30.0004 61.276 30.0004 60.9774V54.8403ZM44.0662 23.8082H36.3162V38.1266H44.0662C45.9982 38.1266 47.5566 37.4663 48.7419 36.1441C49.9266 34.8246 50.5192 33.0977 50.5192 30.9668C50.5192 28.837 49.9266 27.1106 48.7419 25.7895C47.5566 24.4685 45.9983 23.8082 44.0662 23.8082Z"
    />
  </svg>

  <svg 
    v-else-if="name === 'file-image'"
    width="40"
    height="52"
    viewBox="0 0 40 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path class="icon-bg" d="M30.293 0.879002L39.121 9.707C39.688 10.273 40 11.027 40 11.828V43V45V49C40 50.654 38.654 52 37 52H3C1.346 52 0 50.654 0 49V45V43V3C0 1.346 1.346 0 3 0H28.171C28.973 0 29.727 0.313002 30.293 0.879002Z"/>
    <path d="M39.121 9.707L30.293 0.879C29.727 0.313 28.973 0 28.171 0H3C1.346 0 0 1.346 0 3V43V45V49C0 50.654 1.346 52 3 52H37C38.654 52 40 50.654 40 49V45V43V11.828C40 11.027 39.688 10.273 39.121 9.707ZM36.586 10H31C30.449 10 30 9.552 30 9V3.414L36.586 10ZM37 50H3C2.449 50 2 49.552 2 49V47.815C2.314 47.928 2.648 48 3 48H37C37.352 48 37.686 47.928 38 47.816V49C38 49.552 37.551 50 37 50ZM38 45C38 45.552 37.551 46 37 46H3C2.449 46 2 45.552 2 45V43V3C2 2.448 2.449 2 3 2H28V9C28 10.654 29.346 12 31 12H38V43V45Z" fill="url(#paint0_linear)"/>
    <path d="M24.5 20C23.837 20 23.2011 20.2634 22.7322 20.7322C22.2634 21.2011 22 21.837 22 22.5C22 23.163 22.2634 23.7989 22.7322 24.2678C23.2011 24.7366 23.837 25 24.5 25C25.163 25 25.7989 24.7366 26.2678 24.2678C26.7366 23.7989 27 23.163 27 22.5C27 21.837 26.7366 21.2011 26.2678 20.7322C25.7989 20.2634 25.163 20 24.5 20Z" fill="url(#paint1_linear)"/>
    <path d="M28 16H12C10.346 16 9 17.346 9 19V35C9 36.654 10.346 38 12 38H28C29.654 38 31 36.654 31 35V19C31 17.346 29.654 16 28 16ZM11 35V34.316L15.833 29.411C16.101 29.139 16.429 29.007 16.819 29C17.184 29.008 17.525 29.166 17.78 29.446L23.739 36H12C11.449 36 11 35.552 11 35ZM29 35C29 35.552 28.551 36 28 36H26.442L19.259 28.101C18.631 27.411 17.779 27.02 16.858 27.001C15.954 26.964 15.066 27.34 14.407 28.007L11 31.466V19C11 18.448 11.449 18 12 18H28C28.551 18 29 18.448 29 19V35Z" fill="url(#paint2_linear)"/>

    <defs>
      <linearGradient id="paint0_linear" x1="20" y1="-1" x2="20" y2="54.012" gradientUnits="userSpaceOnUse">
        <stop stop-color="var(--v-primary-base)"/>
        <stop offset="1" stop-color="var(--v-secondary-base)"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="20" y1="15.5769" x2="20" y2="38.8512" gradientUnits="userSpaceOnUse">
        <stop stop-color="var(--v-primary-base)"/>
        <stop offset="1" stop-color="var(--v-secondary-base)"/>
      </linearGradient>
      <linearGradient id="paint2_linear" x1="20" y1="15.5769" x2="20" y2="38.8512" gradientUnits="userSpaceOnUse">
        <stop stop-color="var(--v-primary-base)"/>
        <stop offset="1" stop-color="var(--v-secondary-base)"/>
      </linearGradient>
    </defs>
  </svg>


  <v-icon
    v-else
    v-bind="$attrs"
    class="icon"
    v-text="name"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AppIcon extends Vue {
  @Prop({ type: String }) name!: string;
}
</script>
