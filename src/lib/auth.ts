/**
 * Simple authentication utilities for login/register
 */

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthResult {
    success: boolean;
    error?: string;
}

/**
 * Login a user
 */
export const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
        console.log('Attempting login for:', email);

        const response = await fetch("/api/v1/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Login failed:', data.error);
            return { success: false, error: data.error || "Login failed" };
        }

        console.log('Login successful, storing data');

        // Store token and user data in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        return { success: true };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: "An unexpected error occurred" };
    }
};

/**
 * Register a new user
 */
export const register = async (name: string, email: string, password: string): Promise<AuthResult> => {
    try {
        console.log('Attempting registration for:', email);

        const response = await fetch("/api/v1/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Registration failed:', data.error);
            return { success: false, error: data.error || "Registration failed" };
        }

        console.log('Registration successful, storing data');

        // Store token and user data in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        return { success: true };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: "An unexpected error occurred" };
    }
};

/**
 * Logout the current user
 */
export const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

/**
 * Get the current user from localStorage
 */
export const getCurrentUser = (): User | null => {
    try {
        const userData = localStorage.getItem("user");
        if (!userData) return null;
        return JSON.parse(userData);
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};

/**
 * Check if user is logged in
 */
export const isLoggedIn = (): boolean => {
    return !!localStorage.getItem("token") && !!localStorage.getItem("user");
};
