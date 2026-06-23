const express = require('express');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const { runQuery, initDB } = require('./template/database_template');

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
    try {
        const comments = await runQuery("SELECT * FROM comments");
        res.render('template', { comments, loginResult: null });
    } catch (err) {
        console.error(err);
        res.status(500).send("DB Error");
    }
});

// Template Start (Edit from here)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    
    let loginResult = '';
    try {
        const rows = await runQuery(query, [username, password]);
        const user = rows[0]; 

        if (user) {
            loginResult = `로그인 성공! 환영합니다, ${user.username}님.`;
        } else {
            loginResult = '로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.';
        }
    } catch (err) {
        loginResult = `DB Error: ${err.message}`;
    }

    const comments = await runQuery("SELECT * FROM comments");
    res.render('template', { comments, loginResult });
});

app.post('/comment', async (req, res) => {
    const { content } = req.body;

    try {
        const query = `INSERT INTO comments (content) VALUES (?)`;
        const sanitized = sanitizeHtml(content);
        await runQuery(query, [sanitized]);
    } catch (err) {
        console.error(err);
    }
    res.redirect('/');
});

// Template end

// 서버 실행 시 DB 초기화 함수 호출
app.listen(port, async () => {
    console.log("Setting up DB...");
    await initDB(); 
    console.log(`Done! Server running on port 8080`);
});