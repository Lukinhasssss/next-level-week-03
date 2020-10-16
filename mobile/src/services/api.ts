import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.0.7:3333' // URL caso esteja rodando o app em um dispositivo físico
})

export default api

//      Caso esteja utilizando um emulador android:
//          No terminal:
//              adb reverse tcp:3333 tcp:3333
//          Na baseURL:
//              'http://localhost:3333'