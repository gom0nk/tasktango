import jwt from 'jsonwebtoken';

// Secret key for JWT signing and verification
// In production, use an environment variable for this
const JWT_SECRET = process.env.JWT_SECRET || 'tasktango-secret-key';
const JWT_EXPIRES_IN = '7d'; // 7 days

interface JwtPayload {
    userId: string;
    email: string;
    name?: string;
}

/**
 * Generate a JWT token for a user
 */
export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
};

/**
 * Verify and decode a JWT token
 */
export const verifyToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return decoded;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};

/**
 * Get user info from a request's authorization header
 */
export const getUserFromToken = (authHeader?: string): JwtPayload | null => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.split(' ')[1];
    return verifyToken(token);
};
