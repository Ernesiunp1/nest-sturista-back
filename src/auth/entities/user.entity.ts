import { Inmueble } from 'src/inmuebles/entities/inmueble.entity';
import { Vehiculo } from 'src/vehiculos/entities/vehiculo.entity';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nombre: string 

    @Column( 'text', {unique: true} )
    aliasUsuario: string

    @Column('text', {default: ""})

    apellido: string

    @Column('text', {unique: true} )
    email: string

    @Column('text', { select: false })
    password: string

    @Column('integer', {unique: true})
    telefono: number

    @Column('bool', {default: true} )
    suscripcion: boolean

    @Column('bool', {default: true} ) 
    isActive:  boolean

    @Column( 'text',{ array: true, default: ['user'] } )
    roles: string[]


    @OneToMany(
        () => Inmueble,
        (inmuebles) => inmuebles.user
    )
    inmnuebles: Inmueble


    @OneToMany(
        () => Vehiculo,
        (vehiculos) => vehiculos.user
    )
    vehiculos: Vehiculo



    @BeforeInsert()
    chequeoDeCamposAntesDeInsert(){
        this.email = this.email.toLowerCase().trim()
    }

    @BeforeUpdate()
    chequeoAntesdeActualizar(){
        this.chequeoDeCamposAntesDeInsert()
    }

 




}


   