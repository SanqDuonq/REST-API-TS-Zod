import {DocumentType, getModelForClass, modelOptions, pre, prop, Severity} from '@typegoose/typegoose'
import {nanoid} from 'nanoid'
import argon2 from 'argon2'
import { log } from '../utils/logger';

@pre<UserModel>("save", async function() {
    if (!this.isModified('password')){
        return;
    }
    const hash = await argon2.hash(this.password)
    this.password = hash    
    return;
})

@modelOptions({
    schemaOptions: {
        timestamps:true
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})


export class UserModel {
    @prop({lowercase: true,required:true,unique:true})
    email: string

    @prop({required:true})
    firstName: string

    @prop({required:true})
    lastName: string

    @prop({required:true})
    password: string

    @prop()
    passwordReset: string | null

    @prop({required:true , default: () => nanoid()})
    verificationCode: string

    @prop({default:false}) 
    verified: boolean


    async validatePassword(this:DocumentType<UserModel>,candidatePassword:string) {
        try {
            return await argon2.verify(this.password,candidatePassword)
        } catch (error) {
            log.error(error,'Could not validate password')
            return false;
        }
    }
    
}

const User = getModelForClass(UserModel)

export default User