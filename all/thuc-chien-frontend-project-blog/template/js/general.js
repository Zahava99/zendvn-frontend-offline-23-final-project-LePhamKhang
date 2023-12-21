const API = axios.create({
  baseURL: 'https://apiforlearning.zendvn.com/api/v2/'
})

// Daytime and language Format
dayjs.extend(window.dayjs_plugin_relativeTime)
dayjs.locale('vi')