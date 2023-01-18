require('dotenv').config();

module.exports = {
    SUPPORT_SERVER: '',// the support server of the bot
    CLIENT_ID: '',// your bot id here
    PERMISSIONS: '521871941441',// all the permissions that the bot need,(don't edit)
    BOT_PRESENCE: {
        ENABLED: true, // ENABLING the bot to update his status every 60sec
        STATUS: "idle", // The bot's status [online, idle, dnd, invisible]
        TYPE: 2, // Status type for the bot [PLAYING = 0 | STREAMING = 1 | LISTENING = 2 | WATCHING = 3 | CUSTOM = 4 | COMPETING = 5 ]
        MESSAGE: "/play | On {servers} Guilds", // Your bot status message ({servers} = the guilds size that the bot is on, {users} the users size on all the guilds)
    },
    MUSIC: {
        IDLE_TIME: 10//time in seconds before the client disconnects from the voice channel after the queue end. 
    },
    NODES: [
    {
        host: "", // add the host here
        port: 443,// port here
        password: "",// the host password here
        identifier: "main",// the name of the host || "main"
        retryDelay: 60000, // the retry delay
        secure: true, // self hosted: true, else: false

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
