import { Entity, PrimaryColumn, Generated, Column } from 'typeorm';

@Entity({ name: 'TAG' })
export default class Tag {
	@PrimaryColumn({ name: 'TAG_ID', type: 'bigint', unsigned: true })
	@Generated('increment')
	id: number;

	@Column({ name: 'NAME', length: 24, nullable: false })
	name: string;

	static create(tagName: string): Tag {
		const tag = new Tag();
		tag.name = tagName;
		return tag;
	}
}
