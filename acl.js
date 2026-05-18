
const cekAutentikasi = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

/**
 * @param {...string} roles
 * @example 
 */
const cekRole = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.session.userRole)) {
            next();
        } else {
            res.status(403).send(
                "Akses Ditolak: Anda tidak memiliki izin untuk halaman ini."
            );
        }
    };
};

/**
 * @param {string} izinSpesifik 
 * @example 
 */
const cekIzin = (izinSpesifik) => {
    return (req, res, next) => {
        if (req.session.permissions && req.session.permissions.includes(izinSpesifik)) {
            next();
        } else {
            res.status(403).send(
                `Akses Ditolak: Anda membutuhkan hak akses '${izinSpesifik}' untuk melakukan tindakan ini.`
            );
        }
    };
};

module.exports = { cekAutentikasi, cekRole, cekIzin };
