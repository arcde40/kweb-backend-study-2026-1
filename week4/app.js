const {runQuery} = require('./database');

(async () => {
    console.log(await runQuery('select * from students;'));
})();