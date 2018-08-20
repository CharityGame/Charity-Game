const User = require('./user')
const Event = require('./event')

User.belongsToMany(Event, {through: 'userEvents'});
Event.belongsToMany(User, {through: 'userEvents'});

module.exports = {
  User,
  Event
}
