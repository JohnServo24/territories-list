import { cookies } from 'next/dist/client/components/headers';
import { NextResponse } from 'next/server';

import request from "@/utils/request";
import { NOT_FOUND } from '@/constants/httpStatuses';
import InvalidCredentials from '@/errors/InvalidCredentials';
import serverErrorHandler from '@/utils/serverErrorHandler';
import { setToken } from '@/utils/jwt';

const BASE_URL = `${process.env.BASE_URL}/Account/SignIn`;

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        const loginReq = await request.post(BASE_URL, { username, password });

        if (loginReq.code === NOT_FOUND) {
            throw new InvalidCredentials(loginReq.body?.message);
        }

        const token = setToken({ username, password });
        cookies().set('token', token, { secure: true });

        return NextResponse.json({ message: "Hello" });
    } catch (err) {
        return await serverErrorHandler(err);
    }
}
