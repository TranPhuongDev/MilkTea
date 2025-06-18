'use client';

import axios, { endpoints } from 'src/lib/axios';

import { setSession } from './utils';
import { JWT_STORAGE_KEY, EMAIL } from './constant';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  try {
    const params = { email, password };

    const res = await axios.post(endpoints.auth.signIn, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Verify email
 *************************************** */
export const verifyEmail = async (email: string, codeId: string): Promise<void> => {
  const params = { email, codeId };

  try {
    const res = await axios.post(endpoints.auth.verify, params);
    if (!res.data) console.log('code hoặc email không hợp lệ');
    sessionStorage.removeItem(EMAIL);
  } catch (error) {
    console.error('Error during verify email:', error);
    throw error;
  }
};

/** **************************************
 * Resend email
 *************************************** */

export const resendEmail = async (email: string): Promise<void> => {
  try {
    const res = await axios.post(endpoints.auth.retrycode, { email });
    console.log('res.data:', res.data);
  } catch (error) {
    console.error('Error during resend email:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpParams): Promise<void> => {
  const params = {
    email,
    password,
    firstName,
    lastName,
  };

  try {
    const res = await axios.post(endpoints.auth.signUp, params);

    console.log('res.data:', res.data);

    const { email } = res.data;

    if (!email) {
      throw new Error('Access token not found in response');
    }

    sessionStorage.setItem(EMAIL, email);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
