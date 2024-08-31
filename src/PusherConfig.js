import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    encrypted: process.env.REACT_APP_PUSHER_USE_TLS === 'true',
    authEndpoint: `${process.env.REACT_APP_API_URL}/pusher/auth`,
});

export default pusher;
