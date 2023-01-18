require('dotenv').config();

module.exports = {
    SUPPORT_SERVER: 'https://discord.gg/naGkv5j2wf',
    CLIENT_ID: '827179673376915516',
    PERMISSIONS: '521871941441',
    BOT_PRESENCE: {
        ENABLED: true, // Whether or not the bot should update its status
        STATUS: "idle", // The bot's status [online, idle, dnd, invisible]
        TYPE: 2, // Status type for the bot [PLAYING = 0 | STREAMING = 1 | LISTENING = 2 | WATCHING = 3 | CUSTOM = 4 | COMPETING = 5 ]
        MESSAGE: "/play | On {servers} Guilds", // Your bot status message
    },
    MUSIC: {
        IDLE_TIME: 10//time in seconds before the client disconnects from the voice channel. 
    },
    NODES: [
    {
        host: "lavalink.botsuniversity.ml",
        port: 443,
        password: "mathiscool",
        identifier: "main",
        retryDelay: 60000,
        secure: true,

    },

    ],
    SPOTIFY:{
        CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        CLIENT_SECRET: process.env.SPOTIFY_CLIENT_ID_SECRET,
        ALBUM_LIMIT: 1,
        PLAYLIST_LIMIT: 1,

    },
    DEEZER:{
        ALBUM_LIMIT: 1,
        PLAYLIST_LIMIT: 1,

    },

    EMBED_COLORS:{
        PLAY: '#00B330',
        SKIP: '#0095B3',
        STOP: '#B30003',
        QUEUE_END: '#400001',
        QUEUE_ADD: '#144000',
        QUEUE_CLEARED: '#001E9A',
        ERROR: '#FF0000',
        SUCCESS: '#3CFF00',

    },
};