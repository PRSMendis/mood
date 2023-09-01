import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Home from '../app/page'

vi.mock('@clerk/nextjs', () => {
    const mockedFunctions = {
        auth: () => new Promise((resolve) => resolve({userId: '123'})),
        ClerkProvider: ({children}: any) => <div>{children}</div>,
        useUser: () => ({
            isSignedIn: true,
            user: {
              id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
              fullName: 'Charles Harris',
            },
        }),
    }
    return mockedFunctions
})

test('Home', async () => {
    render (await Home())
    expect(screen.getByText('get started')).toBeTruthy()
})