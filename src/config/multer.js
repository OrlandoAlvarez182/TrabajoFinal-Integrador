import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/publico');
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();

        const nombreLimpio = path.basename(file.originalname, extension)
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-_]/g, '');

        const prefijoUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);

        cb(null, `${prefijoUnico}-${nombreLimpio}${extension}`);
    }
});

const filtrarSoloImagenes = (req, file, cb) => {
    const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (tiposPermitidos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no válido. Solo se permiten imágenes (JPEG, PNG, WEBP).'), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: filtrarSoloImagenes,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});