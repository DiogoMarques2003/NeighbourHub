import jwt from 'jsonwebtoken';

export default function generateToken(params: object) {
  return jwt.sign({ params }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 1 dia em MS
  });
}
