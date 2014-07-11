var title = 'Muqq Platform';


exports.index = function(req, res) {
    res.render('layout', {title: title, content:'home'});
};

