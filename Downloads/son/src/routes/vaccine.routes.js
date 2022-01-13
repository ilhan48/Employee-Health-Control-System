const router = require('express-promise-router')();
const vaccineController = require('../controllers/vaccine.controller');

//Aşı bilgisi girme
router.post('/vaccine', vaccineController.createVaccine);
//Aşı bilgisi güncelleme
router.put('/vaccine/:tcno', vaccineController.updateVaccine);
//Aşı bilgisi silme
router.delete('/vaccine/:tcno', vaccineController.deleteVaccine);

module.exports = router;