var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Downtown Donuts' });
});

router.get('/about', function(req, res) {
  res.render('about', { title: 'About Us' });
});

router.get('/menu', function(req, res) {
  res.render('menu', { title: 'Menu' });
});

router.get('/comments', function(req, res) {
  res.render('comments', { title: 'Comments' });
});

router.get('/api/comments', function(req, res) {
  const limit = 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  req.db.query('SELECT * FROM comments ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset], function(err, results) {
    if (err) {
      return res.status(500).json({ error: 'Failed to load comments.' });
    }
    res.json({ comments: results, page });
  });
});

router.post('/api/comments', function(req, res) {
    const { name, message } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Name is required.' });
    }
    if (!message || !message.trim()) {
        return res.status(400).json({ error: 'Message is required.' });
    }
    if (name.trim().length > 20) {
        return res.status(400).json({ error: 'Name must be under 20 characters.' });
    }
    if (message.trim().length > 500) {
        return res.status(400).json({ error: 'Message must be under 500 characters.' });
    }
    
    console.log('Received comment:', name, message);
    try {
        req.db.query('INSERT INTO comments (name, message, created_at) VALUES (?, ?, NOW())', [name, message], (err, results) => {
            if (err) {
                console.error('Error adding comment:', err);
                return res.status(500).json({ error: 'Error adding comment' });
            }
            console.log('Comment added successfully:', results);
            res.status(201).json({ success: true });
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Error adding comment' });
    }
});

module.exports = router;