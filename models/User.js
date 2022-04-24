//regex originally assignment option for module 17 weekly project. 
//validateEmail taken and formatted from photo-port 
const { Schema, model } = require('mongoose');

const validateEmail = function(email) {
  let regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return regex.test(String(email).toLowerCase());
}