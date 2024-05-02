'use strict';
const usersJSON = require('../usuarios.json')
const provinceJSON = require('../province.json')
const roleJSON = require('../role.json')
const usersmap = usersJSON.map((u)=>{
  const province = provinceJSON.find(p=> p.code === u.province)
  const role = roleJSON.find(r=> r.name === u.role)
  return {
    userName: u.userName,
    name: u.name,
    email: u.email,
    password: u.password,
    province: province? province.id : null,
    locality: u.locality,
    postal: u.postal,
    street: u.street,
    streetNumber: u.streetNumber,
    floor: u.floor,
    betweenSt1: u.betweenSt1,
    betweenSt2: u.betweenSt2,
    phoneNumber: u.phoneNumber,
    indications: u.indications,
    userPicture: u.userPicture,
    role: role.id
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('users', usersmap, {});
    
  },

  async down (queryInterface, Sequelize) {
  
      await queryInterface.bulkDelete('users', null, {});
     
  }
};