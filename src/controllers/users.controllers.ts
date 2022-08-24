import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import UserModel from '../models/user.model'

const userModel = new UserModel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.create(req.body)
    res.status(200).json({ message: 'User Created Successfully', data: { ...user } })
  } catch (error) {
    next(error)
  }
}

export const getMany = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.getMany()
    res.status(200).json({ message: 'users relative successfully', data: users })
  } catch (error) {
    next(error)
  }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.getOne(req.params.id as unknown as number)
    res.status(200).json({ message: 'user relative successfully', data: user })
  } catch (error) {
    next(error)
  }
}

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.updateOne(req.body)
    res.status(200).json({ message: 'User Updated Successfully', data: user })
  } catch (error) {
    next(error)
  }
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.deleteOne(req.params.id as unknown as number)
    res.status(200).json({ message: 'User deleted Successfully', data: user })
  } catch (error) {
    next(error)
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_name, password } = req.body
    const user = await userModel.authenticate(user_name, password)
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string)
    if (!user) {
      return res.status(401).json({
        message: 'Please check your username or password'
      })
    }
    return res
      .status(200)
      .json({ data: { ...user, token }, message: 'you had successfully logged in' })
  } catch (error) {
    return next(error)
  }
}
