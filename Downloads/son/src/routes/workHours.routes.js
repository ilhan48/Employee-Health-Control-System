const router = require('express-promise-router')();
const workController = require('../controllers/workHours.controller');

//Çalışma saati bilgisi girme
router.post('/work', workController.createWorkHour);
//Çalışma saati bilgisi güncelleme
router.put('/work/:tcno', workController.updateWorkHour);
//Çalışma saati bilgisi silme
router.delete('/work/:tcno', workController.deleteWorkHour);

module.exports = router;