import { NextFunction, Request, Response } from 'express'
import OrderProductModel from '../models/order-products'

const orderProductModel = new OrderProductModel()

export const createorderproduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderproduct = await orderProductModel.create(req.body)
    res
      .status(200)
      .json({ message: 'order product Created Successfully', data: { ...orderproduct } })
  } catch (error) {
    next(error)
  }
}

export const getMany = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await orderProductModel.getMany()
    res.status(200).json({ message: 'order-product relative successfully', data: orderProduct })
  } catch (error) {
    next(error)
  }
}
export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await orderProductModel.getOne(req.params.id as unknown as number)
    res.status(200).json({ message: 'order-product relative successfully', data: orderProduct })
  } catch (error) {
    next(error)
  }
}
export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await orderProductModel.updateOne(req.body)
    res.status(200).json({ message: 'order-product Updated Successfully', data: orderProduct })
  } catch (error) {
    next(error)
  }
}
export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await orderProductModel.deleteOne(req.params.id as unknown as number)
    res.status(200).json({ message: 'order-product deleted Successfully', data: orderProduct })
  } catch (error) {
    next(error)
  }
}
