import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/service/authService';

export async function POST(request: NextRequest) {
    try {
        console.log('🔐 Login API: Request received');

        const body = await request.json();
        const { email, password } = body;

        console.log('🔐 Login API: Email received:', email);
        console.log('🔐 Login API: Password length:', password?.length);

        // Validate input
        if (!email || !password) {
            console.log('❌ Login API: Missing email or password');
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        console.log('🔐 Login API: Calling loginUser service');

        // Login user
        const result = await loginUser({ email, password });

        console.log('🔐 Login API: Service result:', result ? 'Success' : 'Failed');

        if (!result) {
            console.log('❌ Login API: Invalid credentials');
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        console.log('✅ Login API: Login successful, returning result');

        // Return user data and token
        return NextResponse.json(result);
    } catch (error) {
        console.error('❌ Login API: Error occurred:', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}