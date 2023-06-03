import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Vehiculo {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column('text', {nullable: true})
    "usuario": string

    @Column('text', )
    "nombreAnuncio": string

    @Column('text')
    "region": string
    
    
    @Column('text')
    "ciudad": string


    @Column('text')
    "tipo_vehiculo": string
    
    
    @Column('text')
    "modelo": string

    @Column('text')
    "marca": string

    @Column('integer')
    "anio": number  

    @Column('integer', {default: 5})
    "puestos": number

    @Column('boolean', {default: true})
    "aire": boolean

    @Column('text')
    "descripcion": string

    @Column('float', { default: 0 })
    "precio": number

    @Column('boolean', {default: true})
    "subscripcion": boolean

    @ManyToOne(
        () => User,
        ( user ) => user.vehiculos,
        {eager: true}    
    )
    user : User




}
