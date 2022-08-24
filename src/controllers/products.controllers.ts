import { NextFunction, Request, Response } from 'express'
import ProductModel from '../models/product.model'

const productModel = new ProductModel()

export const createproduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.create(req.body)
    res.status(200).json({ message: 'Product Created Successfully', data: { ...product } })
  } catch (error) {
    next(error)
  }
}

export const getMany = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.getMany()
    res.status(200).json({ message: 'products relative successfully', data: product })
  } catch (error) {
    next(error)
  }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.getOne(req.params.id as unknown as number)
    res.status(200).json({ message: 'product relative successfully', data: product })
  } catch (error) {
    next(error)
  }
}
export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.updateOne(req.body)
    res.status(200).json({ message: 'product Updated Successfully', data: product })
  } catch (error) {
    next(error)
  }
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.deleteOne(req.params.id as unknown as number)
    res.status(200).json({ message: 'product deleted Successfully', data: product })
  } catch (error) {
    next(error)
  }
}
