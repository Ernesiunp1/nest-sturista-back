import { User } from "src/auth/entities/user.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Inmueble {

        @PrimaryGeneratedColumn('uuid')
        id: string;

        @Column('text', {nullable: true})
        "usuario": string

        @Column('text')
        "nombreAnuncio": any

        @Column('text')
        "region": string
        
        @Column('text')
        "ciudad": string
        
        @Column('text', {unique: true})
        "nombre_inmueble": string
        
        @Column('integer')
        "habitaciones": number
        
        @Column('integer')
        "banos": number
        
        @Column('boolean', {default:true})   
        "amoblado": boolean
        
        @Column('float', {default:0} )
        "precio": number
        
        @Column('text', {array: true} )
        "tipo_inmuebles": string[]

        @Column('text', { array: true })
        "facilidades": string[]

        @Column('text', { unique: true })
        "descripcion": string

        @Column('boolean', { default: true })
        "suscripcion": boolean

        @Column('text', { array: true, default:[]})
        'etiquetas': string[]
       

        @ManyToOne(
            () => User,
            ( user ) => user.inmnuebles,
            {eager: true}    
        )
        user : User 


        // @BeforeInsert()
        // checkNombreInmueble(){
        //     if (!this.nombre_inmueble) {
        //         this.nombre_inmueble = this.region
        //     }
                                    
        //     this.nombre_inmueble = this.region
        //     .toLowerCase()
        //     .replaceAll(' ','_')
        //     .replaceAll("'",'')
        // }
            
        


}
