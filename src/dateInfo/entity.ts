import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default class DateInfo {
	@CreateDateColumn({ name: 'CREATE_DATE' })
	createdDate: Date;
	@UpdateDateColumn({ name: 'UPDATE_DATE' })
	updatedDate: Date;
}
