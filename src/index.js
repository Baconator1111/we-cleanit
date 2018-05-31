import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_SOCKET_CONNECTION);

ReactDOM.render(
    <SocketProvider socket={socket}>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </SocketProvider>

    , document.getElementById('root'))

