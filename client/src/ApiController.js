import axios from 'axios';

let handleSession;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  /**
   * axios 인터럽트 설정
   * 401일 경우 App내의 상태를 변경해야 해서 여기서 적용...
   */
  (config) => config,
  (err) => {
    if (err.response.status === 401) {
      handleSession('');
    }
    return Promise.reject(err);
  },
);

export default function setAxios(sess) {
  handleSession = sess;
}
