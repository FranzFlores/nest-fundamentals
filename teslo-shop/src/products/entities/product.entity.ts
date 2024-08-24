import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";

@Entity({ name: 'products' })
export class Product {
    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Id Producto',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'Camiseta Teslo',
        description: 'Título del producto'
    })
    @Column('text', { unique: true })
    title: string;

    @ApiProperty({ example: 1.20 })
    @Column('float', { default: 0 })
    price: number;

    @ApiProperty({ example: 'Descripción del producto', default: null })
    @Column({ type: 'text', nullable: true })
    description: string;

    @ApiProperty()
    @Column('text', { unique: true })
    slug: string;

    @ApiProperty()
    @Column('int', { default: 0 })
    stock: number;

    @ApiProperty()
    @Column('text', { array: true })
    sizes: string[];

    @ApiProperty()
    @Column('text')
    gender: string;

    @ApiProperty()
    @Column({ type: 'text', array: true, default: [] })
    tags: string[];

    @ApiProperty()
    @OneToMany(() => ProductImage, productImage => productImage.product, { cascade: true, eager: true })
    images?: ProductImage[];

    // eager permite obtener siempre la información relacionada
    @ManyToOne(() => User, user => user.products, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title
        }

        this.slug = this.slug.toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug.toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }
}