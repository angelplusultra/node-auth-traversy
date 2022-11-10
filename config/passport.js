const GoogleStrat = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')


module.exports = function(passport) {
    passport.use(new GoogleStrat({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToke, refreshToken, profile, done) => {
            console.log(profile)
    }))
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.desirializeUser((id, done) => {
        User.findById(id, (err, user) => done(err,user))
    })

    // passport.serializeUser(function(user, cb) {
    //     process.nextTick(function() {
    //       cb(null, { id: user.id });
    //     });
    //   });
      
    //   passport.deserializeUser(function(user, cb) {
    //     process.nextTick(function() {
    //       return cb(null, user);
    //     });
    //   });
}

// passport.serializeUser(function(user, cb) {
//     process.nextTick(function() {
//       return cb(null, {
//         id: user.id,
//         username: user.username,
//         picture: user.picture
//       });
//     });
//   });
  
//   passport.deserializeUser(function(user, cb) {
//     process.nextTick(function() {
//       return cb(null, user);
//     });
//   });