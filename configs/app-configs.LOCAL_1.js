export default {
    hostingPort: 5000,
    apiSettings: {
        enabledApi: true,
        apiUrl: "http://l1_game_api_local_1:5000",
        authUrl: "http://l1_auth_api_local_1:5000",
        client: {
            id: "game-server",
            secret: "gameserver@20luminet&",
        },

        useAuthenticate: true,
        requestTimeout: 10000,
        placeBetTimeout: 4500,
        hitJackpotTimeout: 200000,
        enabledApiLogs: true,
    },
    mainServerApiSettings: {
        url: "http://l1_game_server_local_1:5000/api",
        auth: {
            url: "http://l1_auth_api_local_1:5000",
            id: "game-services",
            secret: "gameservices@20luminet&",
        },
        requestTimeout: 10000,
        useAuthenticate: true,
    },
    socketOptions: {
        pingInterval: 60 * 1000,
        pingTimeout: 60 * 1000,
        transports: ["websocket"],
        allowUpgrades: false,
        perMessageDeflate: false,
    },
    enabledLogs: true,
    database: {
        url: "mongodb://lmn_backend:LmnBackend@10.10.50.14:17101/?replicaSet=L1pLocal",
        options: {
            dbName: "minigame",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        },
    },
    sentry: {
        sentryUrl: "https://8f52d1ed1dbc4500adddbfb6e20f66aa@sentryuat.sabagame.com/217",
        logIdentifier: "fourguardians",
        env: "LOCAL_1",
    },
    authenticateSettings: {
        audiences: ["api", "admin-api"],
    },
    adminSecretKey: "asWDEerfOIdgsdqRTFabvmgh",
    enableCorsWs: true,
    corsUrls: ["http://localhost:7456", "http://localhost:7000", "http://l1-games1.lumigame.com", "http://l1-admin1.lumigame.com"],
    freeSpinLiveSeconds: 86400, // 1 day
    bonusLiveSeconds: 127,
};
