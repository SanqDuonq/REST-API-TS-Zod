import {object, string, TypeOf} from 'zod'

export const createUserSChema = object({
    body: object({
        firstName: string({
            required_error: 'First name is required'
        }),

        lastName: string({
            required_error: 'Last name is required'
        }),

        password: string({
            required_error: 'Password is required'
        })
        .min(8,'Password must be at least 8 characters')
        .max(32, 'Password is not more 32 characters'),

        passwordConfirmation: string({
            required_error: 'Password confirmation is required'
        }),

        email: string({
            required_error: 'Email is required'
        })
        .email('Not a valid email')
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Password do not match',
        path: ['passwordConfirmation']
    })
})

export type createUserInput = TypeOf<typeof createUserSChema>['body']