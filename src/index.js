import React from 'react'
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import App from './app/App';

const container = document.querySelector('#root')
const root = createRoot(container)

root.render(

    <React.StrictMode>
        <App/>
    </React.StrictMode>    
    
)