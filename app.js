const express = require('express');

const { registerMiddleware }          = require('./middleware');
const { cekAutentikasi, cekRole, cekIzin } = require('./acl');
const { login, logout }               = require('./auth');

const app  = express();
const PORT = 3000;

app.set('view engine', 'ejs');

registerMiddleware(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    if (req.session.userId) {
        if (req.session.userRole === 'pj_peralatan') return res.redirect('/dashboard-pj');
        if (req.session.userRole === 'mahasiswa')    return res.redirect('/dashboard-mahasiswa');
        return res.redirect('/');
    }
    res.render('login', { error: null, berhasil: req.query.berhasil });
});

app.post('/login', login);
app.get('/logout', logout);

app.get(
    '/dashboard-pj',
    cekAutentikasi,
    cekRole('pj_peralatan'),
    (req, res) => res.render('dashboard_pj')
);

app.get(
    '/dashboard-mahasiswa',
    cekAutentikasi,
    cekRole('mahasiswa'),
    (req, res) => res.render('dashboard_mahasiswa')
);

app.get(
    '/tambah-alat',
    cekAutentikasi,
    cekIzin('tambah-alat'),
    (req, res) => res.render('form_tambah_alat')
);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
