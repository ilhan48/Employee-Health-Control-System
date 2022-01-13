const router = require('express-promise-router')();
const prescriptionController = require('../controllers/prescription.controller');

//Reçete bilgisi girme
router.post('/prescription', prescriptionController.createPrescription);
//Reçete bilgisi güncelleme
router.put('/prescription/:recete_tarihi', prescriptionController.updatePrescription);
//Reçete bilgisi silme
router.delete('/prescription/:recete_tarihi', prescriptionController.deletePrescription);

module.exports = router;
