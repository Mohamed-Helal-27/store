import { NextFunction, Request, Response } from 'express'
import OrderModel from '../models/order.model'

const orderModel = new OrderModel()

export const createorder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.create(req.body)
    res.status(200).json({ message: 'order Created Successfully', data: { ...order } })
  } catch (error) {
    next(error)
  }
}

export const getMany = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.getMany()
    res.status(200).json({ message: 'orders relative successfully', data: order })
  } catch (error) {
    next(error)
  }
}
export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.getOne(req.params.id as unknown as number)
    res.status(200).json({ message: 'order relative successfully', data: order })
  } catch (error) {
    next(error)
  }
}
export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.updateOne(req.body)
    res.status(200).json({ message: 'order Updated Successfully', data: order })
  } catch (error) {
    next(error)
  }
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.deleteOne(req.params.id as unknown as number)
    res.status(200).json({ message: 'order deleted Successfully', data: order })
  } catch (error) {
    next(error)
  }
}