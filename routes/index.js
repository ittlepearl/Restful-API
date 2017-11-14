/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    var controller = require('../controller/todolistController');
    app.use('/api', require('./home.js')(router));

    app.route('/api/users')
      .get(controller.list_users)
      .post(controller.create_a_user);
    app.route('/api/users/:id')
      .get(controller.detail_of_user)
      .put(controller.replace_a_user)
      .delete(controller.delete_a_user);

    app.route('/api/tasks')
      .get(controller.list_tasks)
      .post(controller.create_a_task);
    app.route('/api/tasks/:id')
      .get(controller.detail_of_task)
      .put(controller.replace_a_task)
      .delete(controller.delete_a_task);
};
