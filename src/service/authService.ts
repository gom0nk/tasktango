import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '@/lib/password';
import { generateToken } from '@/lib/jwt';

const prisma = new PrismaClient();

interface RegisterUser {
    name: string;
    email: string;
    password: string;
}

interface LoginUser {
    email: string;
    password: string;
}

interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
}

export const registerUser = async (userData: RegisterUser): Promise<AuthResponse | null> => {
    try {
        console.log('📝 AuthService: Registering user:', userData.email);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email }
        });

        if (existingUser) {
            console.log('❌ AuthService: User already exists');
            return null; // User already exists
        }

        // Hash password
        const hashedPassword = await hashPassword(userData.password);
        console.log('📝 AuthService: Password hashed');

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword
            }
        });

        console.log('📝 AuthService: User created with ID:', newUser.id);

        // Generate JWT token
        const token = generateToken({
            userId: newUser.id,
            email: newUser.email,
            name: newUser.name
        });

        console.log('📝 AuthService: Token generated');

        return {
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            },
            token
        };
    } catch (error) {
        console.error('❌ AuthService: Registration error:', error);
        return null;
    }
};

export const loginUser = async (credentials: LoginUser): Promise<AuthResponse | null> => {
    try {
        console.log('🔐 AuthService: Attempting login for:', credentials.email);

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: credentials.email }
        });

        if (!user) {
            console.log('❌ AuthService: User not found');
            return null; // User not found
        }

        console.log('🔐 AuthService: User found with ID:', user.id);

        // Verify password
        const isPasswordValid = await comparePassword(credentials.password, user.password);

        console.log('🔐 AuthService: Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            console.log('❌ AuthService: Invalid password');
            return null; // Incorrect password
        }

        // Generate JWT token
        const token = generateToken({
            userId: user.id,
            email: user.email,
            name: user.name
        });

        console.log('✅ AuthService: Login successful, token generated');

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        };
    } catch (error) {
        console.error('❌ AuthService: Login error:', error);
        return null;
    }
};