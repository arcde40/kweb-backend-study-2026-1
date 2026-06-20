function requireAuth(req, res, next) {
  // TODO: Implement authentication check
  // 1. Check if user is logged in (check session)
  // 2. If not, return 401
  // 3. If yes, attach user info to req.user and call next()

  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  next();
}

module.exports = { requireAuth };
