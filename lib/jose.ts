import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

type Token = JWTPayload

export async function sign(payload: Token): Promise<{ token: string, expiresAt: number }> {
    const iat = Math.floor(Date.now() / 1000);
    const expiresAt = (iat + 60 * 60 * 24 * 20) * 1000;

    const token = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(expiresAt)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET))

    return { expiresAt, token };
}

export async function verify(token: string): Promise<Token> {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    // run some checks on the returned payload, perhaps you expect some specific values

    // if its all good, return it, or perhaps just return a boolean
    return payload;
}