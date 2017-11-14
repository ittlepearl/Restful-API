var mongoose = require('mongoose');
Task = mongoose.model('Tasks');
User = mongoose.model('Users');


// -- user controller functions --
// 1. get
exports.list_users = function(req, res){
  var skip = (req.query.skip == undefined) ? undefined : parseInt(req.query.skip);
  var limit = (req.query.limit == undefined) ? undefined : parseInt(req.query.limit);
  var where = (req.query.where == undefined) ? undefined :JSON.parse(req.query.where);
  var sort = (req.query.sort == undefined) ? undefined :JSON.parse(req.query.sort);
  var select = (req.query.select == undefined) ? undefined :JSON.parse(req.query.select)
  var count = (req.query.count == "true") ? true : false;
  User.find(where)
  .sort(sort)
  .select(select)
  .skip(skip)
  .limit(limit)
  .then( (user) =>  {
    console.log(req.query.count);
    if (count) {
      return res.status(200).json({message:'OK',data:user.length});
    }
    console.log(user.length);
    if (user.length == 0){
      return res.status(404).json({message:'Not Found'});
    }
    res.status(200).json({message:'OK',data:user});
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};

// 2. post
exports.create_a_user = function(req, res){
  if(!req.body.email && !req.body.name){
    console.log("don't have email or name");
    res.status(403).json({message:'Forbidden',data:'User can not be created without a name or email.'})
    return
  }

  if(req.body.email){
    User.findOne({email:req.body.email})
    .then((user) => {
      if (user != null){
        console.log(user);
        console.log("duplicated email");
        dup = true;
        return res.status(409).json({message:'Conflict',
                              data:'This email has been registered, please enter another email.'});
      }
      else{
        var new_user = new User(req.body);
        new_user.save()
        .then((user) => {
          return res.status(201).json({message:'Created',data:user});
        })
        .catch((err) => {
          return res.status(500).send(err);
        });
      }
    })
    .catch((err) => {
      res.status(500).json({message:'Error',data:err});
    });
  }
  else { // created with name only
    var new_user = new User(req.body);
    new_user.save()
    .then((user) => {
      return res.status(201).json({message:'Created',data:user});
    })
    .catch((err) => {
      res.status(500).json({message:'Error',data:err});
    });
  }
};

// 3. get by id
exports.detail_of_user = function(req, res){
  User.findById(req.params.id)
  .then((user) => {
    if (user == null){
      res.status(404).json({message:'Not Found'});
      return
    }
    res.status(200).json({message:'OK',data:user});
  })
  .catch((err) => {
    res.status(500).json({message:'Error',data:err});
  });
};

// 4. put by id
exports.replace_a_user = function(req, res){
  console.log(req.params.id);
  User.findOneAndUpdate({"_id": req.params.id}, {$set : req.body}, {new: true})
  .then((user) => {
    res.status(200).json({message:'OK', data:user});
  })
  .catch((err) => {
    res.status(500).json({message:'Error',data:err});
  });
};

// 5. delete by id
exports.delete_a_user = function(req, res) {
  User.remove({_id: req.params.id})
  .then((commandResult) => {
    if(commandResult.result.n == 0){
      res.status(404).json({message:'Not Found'});
      return
    }
    res.status(200).json({message:'OK',data:"Succesfully delete the user."});
  })
  .catch((err) => {
    res.status(500).json({message:'Error',data:err});
  });
};

// -- task controller functions --
// 1. get
exports.list_tasks = function(req, res){
  var skip = (req.query.skip == undefined) ? undefined : parseInt(req.query.skip);
  var limit = (req.query.limit == undefined) ? undefined : parseInt(req.query.limit);
  var where = (req.query.where == undefined) ? undefined :JSON.parse(req.query.where);
  var sort = (req.query.sort == undefined) ? undefined :JSON.parse(req.query.sort);
  var select = (req.query.select == undefined) ? undefined :JSON.parse(req.query.select);
  var count = (req.query.count == "true") ? true : false;
  Task.find(where)
  .sort(sort)
  .select(select)
  .skip(skip)
  .limit(limit)
  .then( (task) =>  {
    if (count) {
      return res.status(200).json({message:'OK',data:task.length});
    }
    console.log(task.length);
    if (task.length == 0){
      return res.status(404).json({message:'Not Found'});
    }
    res.status(200).json({message:'OK',data:task});
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};

// 2. post
exports.create_a_task = function(req, res){
  if(!req.body.name && !req.body.deadline){
    console.log("don't have deadline or name");
    res.status(403).json({message:'Forbidden',data:'Task can not be created without a name or a deadline.'})
    return
  }
  var new_task = new Task(req.body);
  new_task.save()
  .then((task) => {
    return res.status(201).json({message:'created',data:task});
  })
  .catch((err) => {
    res.status(500).json({message:'Error',data:err});
  });

};

// 3. get by id
exports.detail_of_task = function(req, res){
  Task.findById(req.params.id)
  .then((task) => {
    if (task == null){
      res.status(404).json({message:'Not Found'});
      return
    }
    res.status(200).json({message:'OK',data:task});
  })
  .catch((err) => {
    res.status(500).json({message:'Error',data:err});
  });
};

// 4. put by id
exports.replace_a_task = function(req, res){
  console.log(req.params.id);
  Task.findOneAndUpdate({"_id": req.params.id}, {$set : req.body}, {new: true})
  .then((task) => {
    res.status(200).json({message:'OK', data:task});
  })
  .catch((err) => {
    res.status(500).json({message:'Error',data:err});
  });
};

// 5. delete by id
exports.delete_a_task = function(req, res) {
  Task.remove({_id: req.params.id})
  .then((commandResult) => {
    if(commandResult.result.n == 0){
      res.status(404).json({message:'Not Found'});
      return
    }
    res.status(200).json({message:'OK',data:"Succesfully delete the task."});
  })
  .catch((err) => {
    res.status(500).json({message:'Error',data:err});
  });
};
