
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkVxaEhRY1JhM1gzL2xFd29RNTF5ZU0zVHc1QVQwN2NqODFWcno5K3VGOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicnFVYWFhMXl5Zmw0bzNybnFBUmIrbEtiRlI5TFNuK3M5VkpKcGUwR1Aydz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3S3Fxdk5LQkppVThtd3RJdlpmM2FhMzRMZUxPM1VGTDdlTmRRZ25DSEZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFVUJJM0xFbG01L0N3eC9DTTFURk5QZ09WSytWcW9sVEVZSm5JUStRUVJNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllOSFY0bDhuMlNRK3JleXdKSTdLYnFiZVYrMUN0SU9RcXlBOGY1cExvSEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVtL3VDVlc3V2REZTN2Vm9jTEZlSzJhN0ppa1Vnbk84Mi9KckQ1a0NEbVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkZSU0ZoQ1ZjRXB2NzlLM1IrbWtCRHVzZ3V0WjJYQ1orWXJZaHdwQ2gzUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSDVLZHhUaXdBNnlEWjNudEJLeCtQcVlFMldZdUJoT01aWEpYQWI2bnNnOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxkMWZMc0FXNkhxZUM3MkkxSlljTGlGUlpaS3htajhLNndDZ2d5Sm5ZUjcyd05HVU9NeDQ1SXpPZmd1ejhNakV2a2xBdFdPL04wc2hWRkFWZVowY2d3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM2LCJhZHZTZWNyZXRLZXkiOiI0QVBaLzhZeDU3UHRnNkE3cFpGQjZvT2RZemF1Y1ZXOE96bXpsZjVTcUFjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcxNTQyOTQxNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwQjZFNTRFRDkxQThEMEZGODUyRUNCNTdGQTc3MEQxMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwNDQ2NTE0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MTU0Mjk0MTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNjYzQjgxNEEzREMyMjUxN0Q0Mjc1QTRFMUIxMTVCNDgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDQ0NjUxNX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzE1NDI5NDE0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE3QTRFREVGRUEwNDMzM0FGRjdEQUQ1OTA4ODkxNUU5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTA0NDY1MzF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjJBUVNMUzZHIiwibWUiOnsiaWQiOiIyNTQ3MTU0Mjk0MTQ6MzFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxOTk5Mzk2NTMxMTYxMTA6MzFAbGlkIiwibmFtZSI6ImNhcmwg8J+YjfCfpbUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ08vTnMxY1FudVBXd2dZWUF5QUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik5mYStVbUhyL1d5QzNXOHVwM2l4aVBTWWxkKzExRWgraWVLNzlsZ3BXeVk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjNtNlhIZW8rMFZmNmxqc2xBd203N3ByRnJoRDNRUzA2cHh1NXlYWFo5SCtJbWoyYkl4N1FUYUFicXU1MkxWYXdQOVVrRXpaemNnQmI5VlBUY3paRkNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJraUtvL2hrRTJXQnphaXdFWjF5c250L2YvcVBDa3JtZVRUVzcxaGN0YUNuMVBKeWJ1TmlIZHFEbW4xYWpsZ2o1RlVSbktFZ2MvNHpBaXI5Y1RkclRqQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcxNTQyOTQxNDozMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUWDJ2bEpoNi8xc2d0MXZMcWQ0c1lqMG1KWGZ0ZFJJZm9uaXUvWllLVnNtIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTA0NDY1MDgsImxhc3RQcm9wSGFzaCI6IjFLNGhINCIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRkJVIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "carltech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "25415429414",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BWB-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/ygvlzy.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '' ,
    ETAT : process.env.PRESENCE || '.',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
