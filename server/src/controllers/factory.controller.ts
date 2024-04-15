import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { APIFeatures } from '../utils/apiFeatures';
import { Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

export const deleteOne = (Model: Model<any>) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const doc = await Model.findByIdAndDelete(req.params.id);
		if (!doc) {
			return next(new AppError(`No document found with that ID`, 404));
		}
		res.status(204).json({
			status: 'success',
			data: null,
		});
	});

export const updateOne = (Model: Model<any>) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});

export const createOne = (Model: Model<any>) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const doc = await Model.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});

export const getOne = (Model: Model<any>, popOptions: any) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		let query = Model.findById(req.params.id);
		if (popOptions) query = query.populate(popOptions);
		const doc = await query;

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});

export const getAll = (Model: Model<any>, customFilters: string[]) =>
	catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
		let filter = { ...customFilters };

		const features = new APIFeatures(Model.find(filter), req.query)
			.filter()
			.sort()
			.limitFields()
			.pagination();

		const doc = await features.query;

		res.status(200).json({
			status: 'success',
			results: doc.length,
			data: {
				data: doc,
			},
		});
	});
