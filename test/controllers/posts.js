exports.index = function(req, res) {
  res.send()
}

exports.create = function(req, res) {
  res.status(201).send();
}

exports.new = function(req, res) {
  res.send();
}

exports.update = function(req, res) {
  res.send();
}

exports.test = function(req, res) {
  return "Test";
}