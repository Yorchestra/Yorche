import Music from './page_music';
import Games from './page_games';

import Canvas from './Canvas';


document.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname.split('/')[2];
    console.log(path);
    
    if(path === 'page_music') new Music;
    else if(path === 'page_games') new Games;
});

new Canvas();